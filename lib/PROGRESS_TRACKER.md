# Progress Tracker — Real-Time Progress Display System

Real-time progress tracking with terminal UI, JSON output, and watch mode support for long-running AI-orchestrated tasks.

## Features

- **Terminal UI**: Goal statement, task list (completed/current/pending/failed), live metrics
- **Live Metrics**: Current task, elapsed time, tokens used, ETA calculation
- **Multiple Output Formats**: Terminal UI with colors or JSON for machine consumption
- **Watch Mode**: Continuous 2-second refresh cycle with auto-rendering
- **Pause/Resume**: Temporarily suspend tracking without losing elapsed time
- **State Management**: Export/import for resuming across sessions
- **Event Emission**: Listen to lifecycle events (start, complete, fail, pause, resume)
- **Zero Dependencies**: No external packages required

## Installation

```javascript
const { ProgressTracker, TASK_STATUS } = require('./lib/progress-tracker');
```

## Quick Start

```javascript
const tracker = new ProgressTracker({
  outputFormat: 'terminal',  // or 'json'
  watchMode: true,
  refreshInterval: 2000      // 2 seconds
});

// Initialize with goal and task list
tracker.initialize('Build authentication layer', [
  { id: 'auth-1', name: 'Design schema' },
  { id: 'auth-2', name: 'Implement provider' },
  { id: 'auth-3', name: 'Add tests' }
]);

// Execute tasks
tracker.startTask(0);
tracker.completeTask(0, 150);  // 150 tokens

tracker.startTask(1);
tracker.completeTask(1, 200);

// Render progress (or auto-render in watch mode)
tracker.render();

// Get summary
console.log(tracker.getSummary());
```

## API Reference

### Constructor Options

```javascript
new ProgressTracker(options)
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outputFormat` | string | 'terminal' | 'terminal' or 'json' |
| `watchMode` | boolean | false | Auto-refresh every `refreshInterval` |
| `refreshInterval` | number | 2000 | Refresh interval in milliseconds |
| `verbose` | boolean | false | Log all events to console |
| `noColor` | boolean | false | Disable ANSI color codes |
| `outputFile` | string | null | Write output to file instead of stdout |

### Core Methods

#### `initialize(goal: string, tasks: Array<Object>)`

Initialize tracker with goal statement and task list.

```javascript
tracker.initialize('Migrate database', [
  { id: 'plan', name: 'Create migration plan' },
  { id: 'backup', name: 'Backup existing DB' },
  { id: 'migrate', name: 'Run migration' },
  { id: 'verify', name: 'Verify data integrity' }
]);
```

#### `startTask(taskId: number | string)`

Start execution of a task. Automatically completes previous task if any.

```javascript
tracker.startTask(0);      // By index
tracker.startTask('plan'); // By ID
```

#### `completeTask(index?: number, tokens?: number, output?: any)`

Mark task as completed with optional token count and output.

```javascript
tracker.completeTask(0, 150, { rows_affected: 5000 });
```

#### `failTask(index?: number, error: Error | string, tokens?: number)`

Mark task as failed with error message.

```javascript
tracker.failTask(0, new Error('Connection timeout'), 50);
tracker.failTask(1, 'Invalid credentials');
```

#### `addTokens(tokens: number)`

Increment token count (useful for streaming operations).

```javascript
tracker.addTokens(100);
```

#### `pause()` / `resume()`

Pause tracking without losing elapsed time, then resume.

```javascript
tracker.pause();    // Stop counting elapsed time
tracker.resume();   // Resume counting from where it paused
```

### Metrics & State

#### `getMetrics(): Object`

Get current progress metrics snapshot.

```javascript
{
  goal: 'Process workflow',
  status: 'running',              // or 'paused'
  current_task: 'Step 2',
  elapsed_time_ms: 45000,
  elapsed_time: '45s',
  tokens_used: 1250,
  eta_ms: 30000,
  eta: '30s',
  completed: 2,
  failed: 0,
  pending: 1,
  total: 3,
  progress_percent: 67
}
```

#### `getSummary(): Object`

Get simplified summary of progress.

```javascript
{
  goal: 'Build API',
  total: 5,
  completed: 3,
  failed: 0,
  pending: 2,
  tokens: 750,
  elapsed: '2m 15s',
  eta: '1m 30s'
}
```

#### `getElapsedTime(): number`

Get elapsed time in milliseconds (accounting for pauses).

#### `getETA(): number | null`

Estimate time remaining based on average task duration.

### Task Queries

#### `getTask(taskId: number | string): Object | null`

Get task by index or ID.

```javascript
const task = tracker.getTask('auth-1');
// { id: 'auth-1', name: 'Design schema', status: 'completed', ... }
```

#### `getTasks(status?: string): Array<Object>`

Get all tasks, optionally filtered by status.

```javascript
const completed = tracker.getTasks(TASK_STATUS.COMPLETED);
const pending = tracker.getTasks(TASK_STATUS.PENDING);
const failed = tracker.getTasks(TASK_STATUS.FAILED);
```

### Output & Rendering

#### `render(): void`

Render progress based on configured output format.

- Terminal UI: Displays progress bar, metrics, task list
- JSON: Outputs JSON to stdout or file

#### `renderTerminalUI(): void`

Force terminal UI rendering with colors and progress bar.

```
━━━ PROGRESS TRACKER ━━━
Goal: Build authentication layer
[████████░░░░░░░░░░░░░░░░░░░░] 33% (1/3)
Status: RUNNING

Metrics:
  Elapsed: 45s
  ETA: 1m 30s
  Tokens: 450
  Current: Implement provider

Tasks:
  ✓ Design schema (15s) [150 tokens]
  ▶ Implement provider (30s) [300 tokens]
  ○ Add tests

━━━━━━━━━━━━━━━━━━━━━━━━
```

#### `renderJSON(): string`

Get JSON representation of progress.

```json
{
  "timestamp": "2026-06-22T04:11:43.223Z",
  "metrics": { ... },
  "tasks": [
    {
      "id": "auth-1",
      "name": "Design schema",
      "status": "completed",
      "duration_ms": 15000,
      "duration": "15s",
      "tokens": 150,
      "error": null,
      "output": null
    },
    ...
  ]
}
```

### State Management

#### `exportState(): Object`

Export complete state for checkpoint/resume.

```javascript
const state = tracker.exportState();
fs.writeFileSync('checkpoint.json', JSON.stringify(state));
```

#### `importState(state: Object): void`

Import previously exported state (for resuming sessions).

```javascript
const state = JSON.parse(fs.readFileSync('checkpoint.json'));
tracker.importState(state);
```

### Watch Mode

#### `startWatchMode(): void`

Start continuous auto-refresh at configured interval.

```javascript
tracker.startWatchMode();  // Renders every 2s
```

#### `stopWatchMode(): void`

Stop auto-refresh.

```javascript
tracker.stopWatchMode();
```

### Events

Listen to tracker lifecycle events.

```javascript
tracker.on('initialized', data => {
  console.log(`Ready with ${data.taskCount} tasks`);
});

tracker.on('taskStart', task => {
  console.log(`Started: ${task.name}`);
});

tracker.on('taskComplete', task => {
  console.log(`✓ ${task.name} (${task.tokens} tokens)`);
});

tracker.on('taskFailed', task => {
  console.log(`✗ ${task.name}: ${task.error}`);
});

tracker.on('paused', () => console.log('Paused'));
tracker.on('resumed', () => console.log('Resumed'));
tracker.on('watchStarted', () => console.log('Watch mode active'));
tracker.on('watchStopped', () => console.log('Watch mode stopped'));
tracker.on('error', error => console.error(error));
```

### Utilities

#### `formatDuration(ms: number): string`

Convert milliseconds to human-readable duration.

```javascript
tracker.formatDuration(500)      // '0s'
tracker.formatDuration(3500)     // '3s'
tracker.formatDuration(125000)   // '2m 5s'
tracker.formatDuration(3661000)  // '1h 1m 1s'
```

#### `formatBytes(bytes: number): string`

Convert bytes to human-readable size.

```javascript
tracker.formatBytes(512)        // '512.00 B'
tracker.formatBytes(1048576)    // '1.00 MB'
tracker.formatBytes(1073741824) // '1.00 GB'
```

### Cleanup

#### `destroy(): void`

Clean up tracker resources (stop watch mode, clear listeners).

```javascript
tracker.destroy();
```

## Task Status Constants

```javascript
const { TASK_STATUS } = require('./progress-tracker');

TASK_STATUS.PENDING   // 'pending' - Not yet started
TASK_STATUS.CURRENT   // 'current' - Currently executing
TASK_STATUS.COMPLETED // 'completed' - Successfully finished
TASK_STATUS.FAILED    // 'failed' - Execution failed
```

## Usage Examples

### Example 1: Basic Terminal UI with Real-time Updates

```javascript
const tracker = new ProgressTracker({
  outputFormat: 'terminal',
  watchMode: true,
  refreshInterval: 2000
});

tracker.initialize('Process workflow', [
  { id: 'parse', name: 'Parse input' },
  { id: 'transform', name: 'Transform data' },
  { id: 'save', name: 'Save results' }
]);

tracker.startTask(0);
await delay(1000);
tracker.completeTask(0, 100);

tracker.startTask(1);
await delay(1500);
tracker.completeTask(1, 150);

tracker.startTask(2);
await delay(800);
tracker.completeTask(2, 120);
```

### Example 2: JSON Output for Integration

```javascript
const tracker = new ProgressTracker({
  outputFormat: 'json',
  outputFile: '/tmp/progress.json'
});

tracker.initialize('CI/CD Pipeline', tasks);

// ... execute tasks ...

tracker.render();  // Writes JSON to /tmp/progress.json
```

### Example 3: Monitoring with Events

```javascript
const tracker = new ProgressTracker();

tracker.on('taskStart', task => {
  console.log(`▶ ${task.name}`);
});

tracker.on('taskComplete', task => {
  const metrics = tracker.getMetrics();
  console.log(`✓ ${task.name} | Progress: ${metrics.progress_percent}%`);
});

tracker.on('taskFailed', task => {
  console.log(`✗ ${task.name}: ${task.error}`);
});

tracker.initialize('Project', tasks);
// ... execute with automatic event logging ...
```

### Example 4: Pause/Resume During Manual Intervention

```javascript
tracker.startTask(1);
await executeTask1();
tracker.completeTask(1, 200);

tracker.startTask(2);
await executePartialTask2();
tracker.pause();  // User needs to approve

console.log('Waiting for approval...');
await waitForApproval();

tracker.resume();
await completeTask2();
tracker.completeTask(2, 300);
```

### Example 5: State Checkpoint/Resume

```javascript
// Session 1: Execute partial workflow
const tracker1 = new ProgressTracker();
tracker1.initialize('Long workflow', tasks);

// ... execute first few tasks ...

const state = tracker1.exportState();
fs.writeFileSync('.checkpoint', JSON.stringify(state));

// Session 2: Resume from checkpoint
const tracker2 = new ProgressTracker();
tracker2.importState(JSON.parse(fs.readFileSync('.checkpoint')));

// Continue from where we left off
tracker2.startTask(3);
// ... resume execution ...
```

### Example 6: Error Handling

```javascript
tracker.startTask(0);

try {
  const result = await executeTask();
  tracker.completeTask(0, 150, result);
} catch (error) {
  tracker.failTask(0, error, 50);  // Record partial token usage
  
  // Skip failed task and continue
  tracker.startTask(1);
  // ...
}

// Analyze failures
const failedTasks = tracker.getTasks(TASK_STATUS.FAILED);
console.log(`Failed: ${failedTasks.length}/${tracker.tasks.length}`);
```

## Color Codes (Terminal)

Colors used in terminal UI:

- **Green (✓)**: Completed tasks
- **Blue (▶)**: Current task
- **Red (✗)**: Failed tasks
- **Gray (○)**: Pending tasks
- **Cyan**: Progress bar and headers
- **Dim**: Secondary metrics

Disable colors with `noColor: true` option.

## Performance

- **Minimal overhead**: ~1ms per operation
- **Memory**: ~50KB base + ~1KB per task
- **No external dependencies**
- **Supports 1000+ tasks** without performance degradation

## Compatibility

- **Node.js**: 14.x, 16.x, 18.x, 20.x+
- **Platforms**: Linux, macOS, Windows
- **TTY detection**: Auto-detects terminal vs pipe
- **Color support**: Auto-detects terminal capabilities

## Integration Points

### With Task Executor

```javascript
const executor = new TaskExecutor();

executor.on('taskComplete', (task, metrics) => {
  tracker.completeTask(taskId, metrics.tokens, task.output);
});

executor.on('taskFailed', (task, error, metrics) => {
  tracker.failTask(taskId, error, metrics.tokens);
});
```

### With State Manager

```javascript
const stateManager = require('./state-manager');

// Periodically checkpoint
setInterval(() => {
  const state = stateManager.loadState();
  const progress = tracker.exportState();
  state.progress = progress;
  stateManager.saveState(state);
}, 30000);
```

### With CLI

```javascript
// cli.js
if (options.watch) {
  tracker.startWatchMode();
}

if (options.json) {
  tracker.renderJSON();
}

process.on('SIGINT', () => {
  tracker.stopWatchMode();
  tracker.destroy();
});
```

## Testing

Run the test suite:

```bash
node lib/progress-tracker.test.js
```

Test coverage:
- ✓ Initialization
- ✓ Task transitions
- ✓ Failed tasks
- ✓ Token counting
- ✓ Elapsed time
- ✓ Pause/Resume
- ✓ ETA calculation
- ✓ Metrics generation
- ✓ Duration formatting
- ✓ Byte formatting
- ✓ JSON output
- ✓ Event emission
- ✓ State export/import
- ✓ Task retrieval
- ✓ Summary generation

15/15 tests passing.

## Examples

Run example scenarios:

```bash
node lib/progress-tracker.example.js 1   # Basic Terminal UI
node lib/progress-tracker.example.js 2   # JSON Output
node lib/progress-tracker.example.js 3   # Watch Mode
node lib/progress-tracker.example.js 4   # Error Handling
node lib/progress-tracker.example.js 5   # Pause/Resume
node lib/progress-tracker.example.js 6   # File Output
node lib/progress-tracker.example.js 7   # State Management
node lib/progress-tracker.example.js 8   # Metrics & ETA
node lib/progress-tracker.example.js 9   # Event Monitoring
node lib/progress-tracker.example.js 10  # Formatting Utilities
```

## License

Part of the UitKit project. See LICENSE.

## See Also

- `task-executor.js` — Execute individual tasks with metrics
- `state-manager.js` — Persistent checkpoint/resume state
- `task-splitter.js` — Break down goals into tasks
- `goal-parser.js` — Parse natural-language goals
- `failure-learner.js` — Learn from execution failures
