# Progress Tracker Integration Guide

How to integrate ProgressTracker with existing UitKit modules: TaskExecutor, StateManager, TaskSplitter, and GoalParser.

## Overview

The ProgressTracker fits into the UitKit orchestration pipeline like this:

```
GoalParser
    ↓
  [Parse natural-language goal]
    ↓
TaskSplitter
    ↓
  [Split into executable tasks]
    ↓
TaskExecutor + ProgressTracker ← You are here
    ↓
  [Execute with real-time progress tracking]
    ↓
StateManager
    ↓
  [Checkpoint progress for resume]
    ↓
FailureLearner
    ↓
  [Learn from any failures]
```

## Integration with TaskExecutor

TaskExecutor handles task execution. ProgressTracker wraps it with UI/metrics.

### Basic Integration

```javascript
const { TaskExecutor } = require('./task-executor');
const { ProgressTracker } = require('./progress-tracker');

// Create both systems
const executor = new TaskExecutor({ verbose: false });
const tracker = new ProgressTracker({
  outputFormat: 'terminal',
  watchMode: true
});

// Initialize tracker with parsed and split tasks
tracker.initialize('Build microservice auth', tasks);

// Wire executor events to tracker
executor.on('taskStart', (task) => {
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  if (taskIndex >= 0) {
    tracker.startTask(taskIndex);
  }
});

executor.on('taskComplete', (task, metrics) => {
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  if (taskIndex >= 0) {
    tracker.completeTask(taskIndex, metrics.tokens, metrics.output);
  }
});

executor.on('taskFailed', (task, error, metrics) => {
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  if (taskIndex >= 0) {
    tracker.failTask(taskIndex, error, metrics.tokens);
  }
});

// Execute all tasks
for (const task of tasks) {
  await executor.route(task);
}
```

### Advanced: Error Recovery with Progress Tracking

```javascript
const failedTasks = [];

executor.on('taskFailed', (task, error, metrics) => {
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  tracker.failTask(taskIndex, error, metrics.tokens);
  
  failedTasks.push({
    task,
    error,
    attemptNumber: (task.attempts || 0) + 1,
    tokensSpent: metrics.tokens
  });
});

// Execute with retry logic
for (const task of tasks) {
  const maxRetries = 3;
  let success = false;
  
  for (let attempt = 1; attempt <= maxRetries && !success; attempt++) {
    try {
      await executor.route(task);
      success = true;
    } catch (error) {
      if (attempt === maxRetries) {
        tracker.failTask(task.id, error);
      } else {
        tracker.render();  // Update display
        await delay(1000 * attempt);  // Exponential backoff
      }
    }
  }
}
```

## Integration with StateManager

StateManager persists state. ProgressTracker provides progress snapshots to save.

### Checkpoint Progress Periodically

```javascript
const { StateManager } = require('./state-manager');
const { ProgressTracker } = require('./progress-tracker');

const stateManager = new StateManager();
const tracker = new ProgressTracker();

// Initialize goal and tasks
const goal = 'Add OAuth2 + SAML across 15 microservices';
const tasks = await parseAndSplitGoal(goal);
tracker.initialize(goal, tasks);

// Start execution with periodic checkpointing
const checkpointInterval = setInterval(() => {
  // Get current progress
  const progressState = tracker.exportState();
  
  // Merge with orchestration state
  const fullState = stateManager.loadState();
  fullState.progress = progressState;
  fullState.metrics = tracker.getMetrics();
  
  // Save checkpoint
  stateManager.saveState(fullState);
  
  console.log(`Checkpoint saved at ${new Date().toISOString()}`);
}, 60000);  // Every 60 seconds

// Execute workflow
for (const task of tasks) {
  tracker.startTask(task.id);
  try {
    const result = await executor.route(task);
    tracker.completeTask(task.id, result.tokens);
  } catch (error) {
    tracker.failTask(task.id, error, result?.tokens || 0);
  }
}

clearInterval(checkpointInterval);
```

### Resume from Checkpoint

```javascript
// Session 2: Resume from checkpoint
const stateManager = new StateManager();
const tracker = new ProgressTracker();

// Load orchestration state
const savedState = stateManager.loadState();

if (savedState && savedState.progress) {
  // Restore progress state
  tracker.importState(savedState.progress);
  
  console.log(`Resuming from checkpoint:`);
  console.log(`  Goal: ${tracker.goal}`);
  console.log(`  Completed: ${tracker.completedCount} tasks`);
  console.log(`  Tokens used: ${tracker.tokenCount}`);
  
  // Continue from next pending task
  const pendingTasks = tracker.getTasks('pending');
  for (const task of pendingTasks) {
    tracker.startTask(task.id);
    const result = await executor.route(task);
    tracker.completeTask(task.id, result.tokens);
  }
}
```

## Integration with GoalParser

GoalParser produces structured goals. Feed these directly to tracker.

### Parse Goal → Split Tasks → Track Progress

```javascript
const { parseGoal } = require('./goal-parser');
const { TaskSplitter } = require('./task-splitter');
const { TaskExecutor } = require('./task-executor');
const { ProgressTracker } = require('./progress-tracker');

// 1. Parse goal
const goalText = 'Add OAuth2 + SAML across 15 microservices';
const parsedGoal = parseGoal(goalText);

console.log(`Goal: ${parsedGoal.goal}`);
console.log(`Pattern: ${parsedGoal.pattern}`);
console.log(`Complexity: ${parsedGoal.metadata.complexity}`);

// 2. Split into subtasks
const splitter = new TaskSplitter(parsedGoal);
const tasks = splitter.split();

console.log(`Generated ${tasks.length} tasks`);

// 3. Create tracker with goal and tasks
const tracker = new ProgressTracker({
  outputFormat: 'terminal',
  watchMode: true,
  refreshInterval: 2000
});

tracker.initialize(goalText, tasks);

// 4. Execute with tracking
const executor = new TaskExecutor();

executor.on('taskStart', (task) => {
  const idx = tasks.findIndex(t => t.id === task.id);
  if (idx >= 0) tracker.startTask(idx);
});

executor.on('taskComplete', (task, metrics) => {
  const idx = tasks.findIndex(t => t.id === task.id);
  if (idx >= 0) tracker.completeTask(idx, metrics.tokens);
});

for (const task of tasks) {
  await executor.route(task);
}

// 5. Show final summary
console.log('\nFinal Summary:');
console.log(JSON.stringify(tracker.getSummary(), null, 2));
```

## Integration with CLI Tools

Add progress tracking to CLI commands with --watch and --json flags.

### CLI Entry Point

```javascript
// cli.js
const { program } = require('commander');
const { ProgressTracker } = require('./lib/progress-tracker');
const { parseGoal } = require('./lib/goal-parser');
const { TaskSplitter } = require('./lib/task-splitter');

program
  .command('execute <goal>')
  .option('--watch', 'Show real-time progress')
  .option('--json', 'Output as JSON')
  .option('--output <file>', 'Write output to file')
  .action(async (goal, options) => {
    // Parse and split goal
    const parsedGoal = parseGoal(goal);
    const splitter = new TaskSplitter(parsedGoal);
    const tasks = splitter.split();

    // Create tracker with CLI options
    const tracker = new ProgressTracker({
      outputFormat: options.json ? 'json' : 'terminal',
      watchMode: options.watch,
      outputFile: options.output,
      verbose: true
    });

    tracker.initialize(goal, tasks);

    if (options.watch) {
      tracker.startWatchMode();
    }

    // Execute tasks...
    // tracker.render() will output based on format

    process.on('SIGINT', () => {
      tracker.stopWatchMode();
      tracker.destroy();
      process.exit(0);
    });
  });
```

### Usage Examples

```bash
# Real-time terminal UI
uitkit execute "Add OAuth2 to API" --watch

# JSON output for scripting
uitkit execute "Add OAuth2 to API" --json

# Save progress to file
uitkit execute "Add OAuth2 to API" --json --output progress.json

# Combine with file output and watch
uitkit execute "Add OAuth2 to API" --watch --output progress.json
```

## Integration with FailureLearner

FailureLearner analyzes failures. ProgressTracker provides failure data.

### Failure Analysis Pipeline

```javascript
const { ProgressTracker } = require('./progress-tracker');
const { FailureLearner } = require('./failure-learner');

const tracker = new ProgressTracker();
const learner = new FailureLearner();

// Track failures
tracker.on('taskFailed', (task) => {
  const failureData = {
    taskId: task.id,
    taskName: task.name,
    error: task.error,
    tokensUsed: task.tokens,
    duration: task.duration,
    timestamp: new Date().toISOString()
  };

  // Feed to learner
  learner.recordFailure(failureData);

  // Check for patterns
  const patterns = learner.analyzeFailures();
  if (patterns.length > 0) {
    console.log('Failure patterns detected:');
    patterns.forEach(p => console.log(`  - ${p.description}`));
  }
});

// Execute workflow...

// After completion, get recommendations
const recommendations = learner.getRecommendations();
console.log('Recommendations for next run:');
recommendations.forEach(r => console.log(`  - ${r}`));
```

## Multi-Workflow Aggregation

Track multiple parallel workflows and aggregate progress.

### Parallel Execution with Aggregation

```javascript
const { ProgressTracker } = require('./progress-tracker');

const workflows = {
  backend: new ProgressTracker(),
  frontend: new ProgressTracker(),
  infra: new ProgressTracker()
};

// Initialize each workflow
workflows.backend.initialize('Backend API', backendTasks);
workflows.frontend.initialize('Web UI', frontendTasks);
workflows.infra.initialize('Infrastructure', infraTasks);

// Start all workflows in parallel
const results = await Promise.all([
  executeWorkflow(workflows.backend, backendTasks),
  executeWorkflow(workflows.frontend, frontendTasks),
  executeWorkflow(workflows.infra, infraTasks)
]);

// Aggregate metrics
const aggregated = {
  totalTasks: Object.values(workflows).reduce((sum, w) => sum + w.tasks.length, 0),
  totalCompleted: Object.values(workflows).reduce((sum, w) => sum + w.completedCount, 0),
  totalTokens: Object.values(workflows).reduce((sum, w) => sum + w.tokenCount, 0),
  overallProgress: Math.round(
    Object.values(workflows)
      .reduce((sum, w) => sum + (w.completedCount / w.tasks.length) * 100, 0) /
    Object.keys(workflows).length
  ),
  workflows: Object.entries(workflows).map(([name, tracker]) => ({
    name,
    ...tracker.getSummary()
  }))
};

console.log('Aggregated Progress:');
console.log(JSON.stringify(aggregated, null, 2));
```

## HTTP Server Integration

Expose progress as REST API endpoints for external monitoring.

### Express.js Integration

```javascript
const express = require('express');
const { ProgressTracker } = require('./progress-tracker');

const app = express();
const tracker = new ProgressTracker();

// Initialize tracker
tracker.initialize('Workflow', tasks);

// Progress endpoints
app.get('/api/progress', (req, res) => {
  res.json(tracker.getMetrics());
});

app.get('/api/progress.json', (req, res) => {
  res.json(JSON.parse(tracker.renderJSON()));
});

app.get('/api/progress/summary', (req, res) => {
  res.json(tracker.getSummary());
});

app.get('/api/progress/tasks', (req, res) => {
  res.json({
    completed: tracker.getTasks('completed'),
    current: tracker.getTasks('current'),
    pending: tracker.getTasks('pending'),
    failed: tracker.getTasks('failed')
  });
});

app.post('/api/progress/pause', (req, res) => {
  tracker.pause();
  res.json({ status: 'paused' });
});

app.post('/api/progress/resume', (req, res) => {
  tracker.resume();
  res.json({ status: 'resumed' });
});

app.listen(3000, () => {
  console.log('Progress API listening on port 3000');
});
```

### Client-side Query

```javascript
// Query progress from external service
async function getProgress() {
  const response = await fetch('http://localhost:3000/api/progress');
  const metrics = await response.json();
  
  console.log(`Progress: ${metrics.progress_percent}%`);
  console.log(`ETA: ${metrics.eta}`);
  console.log(`Tokens: ${metrics.tokens_used}`);
}
```

## Complete End-to-End Example

Putting it all together: parse goal → split tasks → execute with tracking → checkpoint.

```javascript
const { parseGoal } = require('./goal-parser');
const { TaskSplitter } = require('./task-splitter');
const { TaskExecutor } = require('./task-executor');
const { ProgressTracker } = require('./progress-tracker');
const { StateManager } = require('./state-manager');
const { FailureLearner } = require('./failure-learner');

async function executeGoal(goalText, options = {}) {
  // 1. Parse goal
  console.log('Parsing goal...');
  const parsed = parseGoal(goalText);
  
  // 2. Split into tasks
  console.log('Splitting into tasks...');
  const splitter = new TaskSplitter(parsed);
  const tasks = splitter.split();
  
  // 3. Initialize tracking
  console.log('Initializing tracking...');
  const tracker = new ProgressTracker({
    outputFormat: options.json ? 'json' : 'terminal',
    watchMode: options.watch !== false,
    outputFile: options.outputFile
  });
  
  tracker.initialize(goalText, tasks);
  
  // 4. Check for checkpoint
  const stateManager = new StateManager();
  if (options.resume && stateManager.checkpointExists()) {
    const savedState = stateManager.loadState();
    if (savedState.progress) {
      tracker.importState(savedState.progress);
      console.log(`Resumed from checkpoint: ${tracker.completedCount}/${tracker.tasks.length} complete`);
    }
  }
  
  // 5. Set up failure learning
  const learner = new FailureLearner();
  tracker.on('taskFailed', (task) => {
    learner.recordFailure({
      taskId: task.id,
      error: task.error,
      tokens: task.tokens
    });
  });
  
  // 6. Execute with tracking
  const executor = new TaskExecutor();
  
  executor.on('taskStart', (execTask) => {
    const idx = tasks.findIndex(t => t.id === execTask.id);
    if (idx >= 0) tracker.startTask(idx);
  });
  
  executor.on('taskComplete', (execTask, metrics) => {
    const idx = tasks.findIndex(t => t.id === execTask.id);
    if (idx >= 0) tracker.completeTask(idx, metrics.tokens);
  });
  
  executor.on('taskFailed', (execTask, error, metrics) => {
    const idx = tasks.findIndex(t => t.id === execTask.id);
    if (idx >= 0) tracker.failTask(idx, error, metrics.tokens);
  });
  
  // Execute all tasks
  for (const task of tasks) {
    await executor.route(task);
    
    // Checkpoint periodically
    if (options.checkpoint) {
      const state = stateManager.loadState();
      state.progress = tracker.exportState();
      stateManager.saveState(state);
    }
  }
  
  // 7. Report results
  console.log('\n=== Execution Complete ===');
  console.log(JSON.stringify(tracker.getSummary(), null, 2));
  
  // 8. Get recommendations from learner
  const recommendations = learner.getRecommendations();
  if (recommendations.length > 0) {
    console.log('\nRecommendations for next run:');
    recommendations.forEach(r => console.log(`  - ${r}`));
  }
  
  tracker.destroy();
}

// Usage
executeGoal('Add OAuth2 + SAML across 15 microservices', {
  watch: true,
  json: false,
  checkpoint: true,
  resume: true
});
```

## Performance Tuning

### Optimize for Large Task Sets

```javascript
const tracker = new ProgressTracker({
  refreshInterval: 5000,  // Less frequent refresh for large sets
  verbose: false,          // Disable event logging
  noColor: true           // Disable color processing
});

// For 100+ tasks, only keep last N in memory
tracker.tasksToDisplay = 20;
```

### Optimize for JSON Output

```javascript
const tracker = new ProgressTracker({
  outputFormat: 'json',
  outputFile: '/var/log/progress.json',  // Write to file, not stdout
  refreshInterval: 10000  // Reduce I/O
});
```

## Testing the Integration

```bash
# Test with example goal
node -e "const ex = require('./lib/progress-tracker-integration.example.js'); ex.example1TaskExecutorIntegration();"

# Test with state management
node -e "const ex = require('./lib/progress-tracker-integration.example.js'); ex.example2CheckpointResume();"

# Test CLI integration
node -e "const ex = require('./lib/progress-tracker-integration.example.js'); ex.example3CLIIntegration();"

# Test multi-workflow
node -e "const ex = require('./lib/progress-tracker-integration.example.js'); ex.example5AggregatedProgress();"
```

## See Also

- `PROGRESS_TRACKER.md` - Complete API documentation
- `progress-tracker.test.js` - Test suite
- `progress-tracker.example.js` - Usage examples
- `task-executor.js` - Task execution engine
- `state-manager.js` - Checkpoint/resume
- `goal-parser.js` - Goal parsing
- `task-splitter.js` - Task decomposition
- `failure-learner.js` - Failure analysis
