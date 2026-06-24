# Distributed Tracing — OpenTelemetry Instrumentation

Comprehensive trace instrumentation for UitKit components using OpenTelemetry (OTEL). Captures parent-child span relationships, sampling strategy, and end-to-end tracing for feature calls, theme switches, SVG renders, and sandbox executions.

---

## Overview

Distributed tracing provides end-to-end request flow visibility across UitKit services. Each trace consists of:

- **Root Span** — Initiating request (e.g., user clicks feature, triggers theme change)
- **Child Spans** — Sub-operations (module loading, rendering, validation)
- **Context Propagation** — Trace ID/parent ID carried through async/networked calls
- **Sampling** — Probabilistic span retention to manage volume and cost

---

## Span Definitions

### 1. Feature Execution Trace

Captured when user invokes a feature via CLI or UI.

```yaml
Span Name: feature.execution
Attributes:
  feature_name: string (e.g., "security-review", "fastapi-crud")
  feature_id: string (UUID)
  stack_id: string (e.g., "api_developer_stack")
  invocation_source: enum ["cli", "ui", "api"]
  user_id: string (optional)

Child Spans:
  - feature.validation
      duration_ms: int
      validation_status: enum ["pass", "fail"]
      error_count: int
  
  - feature.dependencies_resolution
      resolved_count: int
      unresolved_count: int
      resolution_time_ms: int
  
  - feature.execution_context_setup
      environment_vars_count: int
      config_loaded: bool
      working_dir: string (sanitized)
  
  - feature.run
      exit_code: int
      stdout_length: int
      stderr_length: int
      wall_time_ms: int
```

**Parent-Child Relationships:**
```
feature.execution (root)
├── feature.validation
├── feature.dependencies_resolution
├── feature.execution_context_setup
└── feature.run
    ├── subprocess.spawn
    ├── process.wait
    └── output.capture
```

**Example Trace JSON:**
```json
{
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spans": [
    {
      "spanId": "00f067aa0ba902b7",
      "name": "feature.execution",
      "startTime": "2026-06-22T10:30:00.000Z",
      "endTime": "2026-06-22T10:30:2.345Z",
      "attributes": {
        "feature_name": "security-review",
        "feature_id": "sec-rev-001",
        "invocation_source": "cli"
      },
      "events": [
        {
          "name": "feature.started",
          "timestamp": "2026-06-22T10:30:00.050Z"
        },
        {
          "name": "feature.completed",
          "timestamp": "2026-06-22T10:30:2.300Z"
        }
      ]
    },
    {
      "spanId": "0af7651916cd43dd",
      "parentSpanId": "00f067aa0ba902b7",
      "name": "feature.validation",
      "duration": "145ms",
      "attributes": {
        "validation_status": "pass",
        "error_count": 0
      }
    },
    {
      "spanId": "9e57a8a5e6f1b8c2",
      "parentSpanId": "00f067aa0ba902b7",
      "name": "feature.run",
      "duration": "2100ms",
      "attributes": {
        "exit_code": 0,
        "stdout_length": 15420,
        "stderr_length": 0
      }
    }
  ]
}
```

---

### 2. Theme Switch Trace

Captured when user changes theme (light/dark/custom).

```yaml
Span Name: theme.switch
Attributes:
  previous_theme: string (e.g., "light", "dark", "custom-blue")
  new_theme: string
  theme_source: enum ["user_preference", "system_default", "override"]
  ui_framework: string (e.g., "react", "svelte", "vue")

Child Spans:
  - theme.schema_resolution
      schema_size_bytes: int
      variables_count: int
      load_time_ms: int
  
  - theme.validation
      valid: bool
      error_list: array[string]
  
  - theme.css_generation
      css_size_bytes: int
      media_queries_count: int
      generation_time_ms: int
  
  - theme.dom_update
      elements_affected: int
      reflow_time_ms: int
      repaint_time_ms: int
  
  - theme.persist
      storage_backend: enum ["localStorage", "indexedDB", "cookies"]
      persistence_time_ms: int
```

**Parent-Child Relationships:**
```
theme.switch (root)
├── theme.schema_resolution
├── theme.validation
├── theme.css_generation
│   ├── postcss.process
│   └── vendor_prefix.inject
├── theme.dom_update
│   ├── dom.query
│   ├── style.compute
│   └── layout.recalculate
└── theme.persist
    └── storage.write
```

---

### 3. SVG Rendering Trace

Captured for SVG Inspector rendering operations.

```yaml
Span Name: svg.render
Attributes:
  svg_id: string (UUID)
  svg_source: enum ["file", "embedded", "generated", "api"]
  svg_size_bytes: int
  complexity_score: float (0-100, based on paths/groups/transforms)
  viewport_width: int
  viewport_height: int

Child Spans:
  - svg.parse
      parse_time_ms: int
      valid_xml: bool
      error_count: int
      element_count: int
  
  - svg.validate
      schema_compliance: float (0-1)
      ns_violations: int
      accessibility_issues: int
  
  - svg.transform
      transform_count: int
      matrix_operations: int
      computation_time_ms: int
  
  - svg.render_canvas
      renderer_type: enum ["canvas", "webgl", "svg"]
      render_time_ms: int
      frame_rate: float
      memory_used_mb: int
  
  - svg.export
      format: enum ["png", "pdf", "webp", "svg"]
      export_time_ms: int
      output_size_bytes: int
```

**Parent-Child Relationships:**
```
svg.render (root)
├── svg.parse
│   ├── xml.parse
│   └── schema.validate
├── svg.validate
│   ├── accessibility.check
│   └── ns.verify
├── svg.transform
│   ├── matrix.compute
│   └── bounds.calculate
├── svg.render_canvas
│   ├── canvas.context_init
│   ├── canvas.draw_element (per element)
│   └── canvas.flush
└── svg.export (if needed)
    └── encoder.compress
```

**Span Event Tracking:**
```json
{
  "spanName": "svg.render",
  "events": [
    {
      "name": "parse.start",
      "timestamp": "2026-06-22T10:30:00.000Z"
    },
    {
      "name": "parse.complete",
      "timestamp": "2026-06-22T10:30:00.045Z",
      "attributes": { "element_count": 1250 }
    },
    {
      "name": "render.start",
      "timestamp": "2026-06-22T10:30:00.050Z"
    },
    {
      "name": "render.frame",
      "timestamp": "2026-06-22T10:30:00.067Z",
      "attributes": { "frame_number": 0 }
    },
    {
      "name": "render.complete",
      "timestamp": "2026-06-22T10:30:00.320Z",
      "attributes": { "total_frames": 5 }
    }
  ]
}
```

---

### 4. Sandbox Execution Trace

Captured for Swarm Sandbox code execution.

```yaml
Span Name: sandbox.execution
Attributes:
  sandbox_id: string (UUID)
  execution_id: string (UUID)
  region: string (e.g., "us-west-2", "eu-central-1")
  runtime: string (e.g., "node18", "python3.11", "deno", "wasmer")
  code_size_bytes: int
  timeout_seconds: int
  memory_limit_mb: int

Child Spans:
  - sandbox.init
      init_time_ms: int
      runtime_version: string
      dependencies_loaded: int
  
  - sandbox.dependency_injection
      dependencies_count: int
      injection_time_ms: int
      conflict_count: int
  
  - sandbox.execution
      wall_time_ms: int
      cpu_time_ms: int
      peak_memory_mb: int
      gc_time_ms: int
  
  - sandbox.output_capture
      stdout_bytes: int
      stderr_bytes: int
      logs_count: int
      capture_time_ms: int
  
  - sandbox.cleanup
      cleanup_time_ms: int
      resources_freed_mb: int
      error_count: int
```

**Parent-Child Relationships:**
```
sandbox.execution (root)
├── sandbox.init
│   ├── runtime.launch
│   ├── context.setup
│   └── resource.allocate
├── sandbox.dependency_injection
│   ├── npm_install / pip_install / deno_cache
│   └── env.export
├── sandbox.execution
│   ├── code.eval
│   ├── memory.monitor
│   └── timeout.watch
├── sandbox.output_capture
│   ├── stdout.stream
│   ├── stderr.stream
│   └── logs.serialize
└── sandbox.cleanup
    ├── process.terminate
    ├── files.cleanup
    └── memory.release
```

**Sandbox Failure Span Attributes:**
```yaml
Span Name: sandbox.execution
Status: ERROR
Attributes:
  error_type: enum ["timeout", "oom", "crash", "security_violation", "network_error"]
  error_message: string (first 500 chars)
  stack_trace: string (sampled, first 1000 chars)
  exit_code: int (if applicable)
  signal: string (e.g., "SIGKILL", "SIGTERM")
  mitigation_attempted: bool
  mitigation_type: enum ["restart", "retry", "fallback", "none"]
```

---

## Sampling Strategy

Probabilistic sampling reduces trace volume while maintaining visibility for high-value operations.

### Sampling Configuration

```yaml
# .claude/settings.json or environment

tracing:
  enabled: true
  sampler:
    type: "probabilistic"
    
    # Root level sampling
    root_sampling_rate: 0.10  # 10% of all traces
    
    # Per-operation sampling (overrides root)
    operation_sampling:
      "feature.execution":
        rate: 0.50  # 50% of feature calls
        filters:
          - feature_name: "security-review"  # 100% for this feature
            rate: 1.0
          - stack_id: "api_developer_stack"  # 80% for this stack
            rate: 0.80
      
      "svg.render":
        rate: 0.25  # 25% of SVG renders
        filters:
          - complexity_score: { gte: 75 }  # 100% for complex SVGs
            rate: 1.0
          - svg_source: "api"  # 50% for API-generated SVGs
            rate: 0.50
      
      "theme.switch":
        rate: 0.05  # 5% of theme switches
      
      "sandbox.execution":
        rate: 0.30  # 30% of sandbox executions
        filters:
          - runtime: "python*"  # 100% for Python sandboxes
            rate: 1.0
          - error_span: true  # 100% for failed executions
            rate: 1.0

    # Adaptive sampling based on error rate
    error_rate_sampler:
      enabled: true
      error_threshold: 0.05  # If error rate > 5%, increase sampling
      boost_rate: 0.50  # Increase to 50% when errors spike
      
    # Traffic-based sampling
    traffic_aware:
      enabled: true
      peak_hours_rate: 0.05  # Reduce during peak traffic
      off_peak_rate: 0.20    # Increase during low traffic

exporters:
  jaeger:
    endpoint: "http://jaeger-collector:14268/api/traces"
    batch_size: 512
    flush_interval_ms: 5000
  
  otlp:
    protocol: "grpc"
    endpoint: "otel-collector:4317"
    compression: "gzip"
```

### Sampling Logic (Pseudocode)

```python
def should_sample(span_context: SpanContext, operation: str) -> bool:
    """
    Determine if span should be sampled based on:
    1. Operation-specific sampling rate
    2. Attribute-based filters
    3. Error status
    4. Trace parent sampling decision (propagate parent decision)
    """
    
    # If parent already sampled, propagate decision
    if span_context.parent_sampled is not None:
        return span_context.parent_sampled
    
    # Check operation-specific config
    op_config = sampling_config.operation_sampling.get(operation)
    if not op_config:
        return random.random() < sampling_config.root_sampling_rate
    
    # Check attribute filters
    for filter_rule in op_config.filters:
        if matches_filter(span_context.attributes, filter_rule.conditions):
            return random.random() < filter_rule.rate
    
    # Check error rate adaptive sampling
    if error_rate_sampler.enabled and current_error_rate > error_threshold:
        return random.random() < error_rate_sampler.boost_rate
    
    # Check traffic-aware sampling
    if traffic_aware.enabled:
        rate = peak_hours_rate if is_peak_hour() else off_peak_rate
        return random.random() < rate
    
    # Default to operation rate
    return random.random() < op_config.rate
```

---

## Context Propagation

Trace context flows across process boundaries, async operations, and networked calls.

### W3C Trace Context Headers

Every HTTP request and message includes:

```http
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
tracestate: vendor-data,other-vendor=data
baggage: userId=alice,requestId=req-456,sessionId=sess-789
```

**Format Breakdown:**
```
version=00
trace_id=4bf92f3577b34da6a3ce929d0e0e4736
parent_id=00f067aa0ba902b7
trace_flags=01 (sampled)
```

### Async/Callback Context Preservation

For async operations (Promise chains, event emitters, timers), store context locally:

```typescript
// Feature execution with async steps
async function executeFeature(featureName: string) {
  const rootSpan = tracer.startSpan('feature.execution', {
    attributes: { feature_name: featureName }
  });
  
  // Preserve context for async callbacks
  const traceContext = tracer.context();
  
  try {
    // Step 1: Validation
    const validationSpan = tracer.startSpan('feature.validation', {
      parent: rootSpan
    });
    await validateFeature(featureName);
    validationSpan.end();
    
    // Step 2: Async dependency resolution
    const depSpan = tracer.startSpan('feature.dependencies_resolution', {
      parent: rootSpan
    });
    
    // Restore context in async callback
    const dependencies = await withContext(traceContext, async () => {
      return await resolveDependencies(featureName);
    });
    
    depSpan.addEvent('dependencies.resolved', {
      attributes: { count: dependencies.length }
    });
    depSpan.end();
    
    // Step 3: Run feature
    const runSpan = tracer.startSpan('feature.run', {
      parent: rootSpan
    });
    const result = await runFeatureCode(featureName);
    runSpan.end();
    
    rootSpan.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    rootSpan.recordException(error);
    rootSpan.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message
    });
  } finally {
    rootSpan.end();
  }
}

// Helper to restore context in async callback
function withContext(context: Context, fn: () => Promise<T>): Promise<T> {
  return context.with(() => fn());
}
```

### Message Queue Context Propagation

For event-driven systems (CLI events, sandbox notifications):

```json
{
  "event_type": "feature.completed",
  "traceparent": "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01",
  "baggage": {
    "feature_name": "security-review",
    "user_id": "alice"
  },
  "payload": {
    "feature_id": "sec-rev-001",
    "result": "success"
  }
}
```

---

## Instrumentation Examples

### Feature Execution (Node.js)

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('uitkit-features');

export async function executeFeature(
  featureName: string,
  options: ExecutionOptions
): Promise<FeatureResult> {
  const span = tracer.startSpan('feature.execution', {
    attributes: {
      feature_name: featureName,
      feature_id: options.featureId,
      stack_id: options.stackId,
      invocation_source: options.source || 'cli'
    }
  });

  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      // Validation phase
      const validationSpan = tracer.startSpan('feature.validation');
      try {
        await validateFeature(featureName);
        validationSpan.addEvent('validation.passed');
      } catch (err) {
        validationSpan.recordException(err);
        validationSpan.setStatus({
          code: SpanStatusCode.ERROR,
          message: 'Validation failed'
        });
        throw err;
      } finally {
        validationSpan.end();
      }

      // Dependency resolution phase
      const depSpan = tracer.startSpan('feature.dependencies_resolution');
      try {
        const deps = await resolveDependencies(featureName);
        depSpan.setAttributes({
          resolved_count: deps.resolved.length,
          unresolved_count: deps.unresolved.length
        });
      } finally {
        depSpan.end();
      }

      // Execution context setup
      const ctxSpan = tracer.startSpan('feature.execution_context_setup');
      try {
        const envVars = await setupEnvironment(options);
        ctxSpan.setAttributes({
          environment_vars_count: Object.keys(envVars).length,
          config_loaded: true
        });
      } finally {
        ctxSpan.end();
      }

      // Feature run
      const runSpan = tracer.startSpan('feature.run');
      try {
        const result = await runFeatureCode(featureName, options);
        runSpan.setAttributes({
          exit_code: result.exitCode,
          stdout_length: result.stdout.length,
          stderr_length: result.stderr.length
        });
        return result;
      } finally {
        runSpan.end();
      }
    } catch (error) {
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: String(error)
      });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### Theme Switch (React)

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('uitkit-ui');

export function useThemeSwitch() {
  const switchTheme = (newTheme: string) => {
    const span = tracer.startSpan('theme.switch', {
      attributes: {
        previous_theme: currentTheme,
        new_theme: newTheme,
        theme_source: 'user_preference',
        ui_framework: 'react'
      }
    });

    return context.with(trace.setSpan(context.active(), span), () => {
      try {
        // Schema resolution
        const schemaSpan = tracer.startSpan('theme.schema_resolution');
        try {
          const schema = loadThemeSchema(newTheme);
          schemaSpan.setAttributes({
            schema_size_bytes: JSON.stringify(schema).length,
            variables_count: Object.keys(schema.variables || {}).length
          });
        } finally {
          schemaSpan.end();
        }

        // Validation
        const valSpan = tracer.startSpan('theme.validation');
        try {
          const validation = validateTheme(newTheme);
          valSpan.setAttributes({
            valid: validation.isValid,
            error_list: validation.errors || []
          });
          if (!validation.isValid) throw new Error('Theme validation failed');
        } finally {
          valSpan.end();
        }

        // CSS generation
        const cssSpan = tracer.startSpan('theme.css_generation');
        try {
          const css = generateCSS(newTheme);
          cssSpan.setAttributes({
            css_size_bytes: css.length,
            media_queries_count: (css.match(/@media/g) || []).length
          });
        } finally {
          cssSpan.end();
        }

        // DOM update
        const domSpan = tracer.startSpan('theme.dom_update');
        try {
          const perf = performance.now();
          applyThemeToDOM(newTheme);
          domSpan.setAttributes({
            elements_affected: document.querySelectorAll('[data-theme]').length,
            reflow_time_ms: performance.now() - perf
          });
        } finally {
          domSpan.end();
        }

        // Persistence
        const persistSpan = tracer.startSpan('theme.persist');
        try {
          localStorage.setItem('theme', newTheme);
          persistSpan.setAttributes({
            storage_backend: 'localStorage',
            persistence_time_ms: 10
          });
        } finally {
          persistSpan.end();
        }

        span.setStatus({ code: SpanStatusCode.OK });
        setCurrentTheme(newTheme);
      } catch (error) {
        span.recordException(error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: String(error)
        });
        throw error;
      } finally {
        span.end();
      }
    });
  };

  return { switchTheme };
}
```

### SVG Rendering (Canvas/WebGL)

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('uitkit-svg-inspector');

export async function renderSVG(
  svgData: SVGData,
  options: RenderOptions
): Promise<RenderResult> {
  const complexityScore = calculateComplexity(svgData);
  
  const span = tracer.startSpan('svg.render', {
    attributes: {
      svg_id: svgData.id,
      svg_source: svgData.source,
      svg_size_bytes: svgData.content.length,
      complexity_score: complexityScore,
      viewport_width: options.width,
      viewport_height: options.height
    }
  });

  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      // Parse
      const parseSpan = tracer.startSpan('svg.parse');
      let parsed: SVGDocument;
      try {
        parsed = parseXML(svgData.content);
        parseSpan.setAttributes({
          valid_xml: true,
          error_count: 0,
          element_count: parsed.querySelectorAll('*').length
        });
      } catch (err) {
        parseSpan.recordException(err);
        parseSpan.setStatus({ code: SpanStatusCode.ERROR });
        throw err;
      } finally {
        parseSpan.end();
      }

      // Validate
      const valSpan = tracer.startSpan('svg.validate');
      try {
        const validation = validateSVG(parsed);
        valSpan.setAttributes({
          schema_compliance: validation.compliance,
          ns_violations: validation.nsViolations,
          accessibility_issues: validation.a11yIssues
        });
      } finally {
        valSpan.end();
      }

      // Transform
      const xformSpan = tracer.startSpan('svg.transform');
      try {
        const transforms = extractTransforms(parsed);
        xformSpan.setAttributes({
          transform_count: transforms.length,
          matrix_operations: countMatrixOps(transforms)
        });
      } finally {
        xformSpan.end();
      }

      // Render to canvas
      const renderSpan = tracer.startSpan('svg.render_canvas', {
        attributes: {
          renderer_type: options.renderer || 'canvas'
        }
      });
      try {
        const canvas = document.createElement('canvas');
        canvas.width = options.width;
        canvas.height = options.height;
        
        const startMem = performance.memory?.usedJSHeapSize || 0;
        const startTime = performance.now();
        
        const ctx = canvas.getContext('2d')!;
        renderSVGToCanvas(parsed, ctx, options);
        
        renderSpan.setAttributes({
          render_time_ms: performance.now() - startTime,
          frame_rate: calculateFrameRate(),
          memory_used_mb: (performance.memory?.usedJSHeapSize || 0 - startMem) / 1024 / 1024
        });

        return {
          canvas,
          imageData: ctx.getImageData(0, 0, canvas.width, canvas.height)
        };
      } finally {
        renderSpan.end();
      }
    } catch (error) {
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: String(error)
      });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### Sandbox Execution (Swarm)

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('uitkit-sandbox');

export async function executeSandbox(
  code: string,
  options: SandboxOptions
): Promise<SandboxResult> {
  const executionId = generateUUID();
  
  const span = tracer.startSpan('sandbox.execution', {
    attributes: {
      sandbox_id: options.sandboxId,
      execution_id: executionId,
      region: options.region,
      runtime: options.runtime,
      code_size_bytes: code.length,
      timeout_seconds: options.timeoutSeconds,
      memory_limit_mb: options.memoryLimitMb
    }
  });

  return context.with(trace.setSpan(context.active(), span), async () => {
    const process = {
      stdout: '',
      stderr: '',
      exitCode: 0,
      memory: 0
    };

    try {
      // Initialize runtime
      const initSpan = tracer.startSpan('sandbox.init');
      try {
        const runtime = await initializeRuntime(options);
        initSpan.setAttributes({
          runtime_version: runtime.version,
          dependencies_loaded: runtime.dependencyCount
        });
      } finally {
        initSpan.end();
      }

      // Inject dependencies
      const depSpan = tracer.startSpan('sandbox.dependency_injection');
      try {
        const injected = await injectDependencies(options.dependencies);
        depSpan.setAttributes({
          dependencies_count: injected.count,
          conflict_count: injected.conflicts.length
        });
        if (injected.conflicts.length > 0) {
          depSpan.addEvent('injection.conflicts', {
            attributes: { conflict_count: injected.conflicts.length }
          });
        }
      } finally {
        depSpan.end();
      }

      // Execute code
      const execSpan = tracer.startSpan('sandbox.execution');
      const startTime = performance.now();
      let cpuTime = 0;
      
      try {
        // Monitor execution
        const memoryMonitor = startMemoryMonitoring();
        const result = await executeWithTimeout(
          code,
          options.timeoutSeconds * 1000
        );
        
        const cpuUsage = process.cpuUsage();
        cpuTime = cpuUsage.user + cpuUsage.system;
        process.memory = memoryMonitor.peak;

        execSpan.setAttributes({
          wall_time_ms: performance.now() - startTime,
          cpu_time_ms: cpuTime / 1000,
          peak_memory_mb: process.memory / 1024 / 1024,
          gc_time_ms: getGCTime()
        });

        process.stdout = result.stdout;
        process.stderr = result.stderr;
        process.exitCode = result.exitCode;
      } catch (err) {
        execSpan.recordException(err);
        if (isTimeoutError(err)) {
          execSpan.setStatus({
            code: SpanStatusCode.ERROR,
            message: 'Execution timeout'
          });
        } else {
          execSpan.setStatus({
            code: SpanStatusCode.ERROR,
            message: String(err)
          });
        }
        throw err;
      } finally {
        execSpan.end();
      }

      // Capture output
      const captureSpan = tracer.startSpan('sandbox.output_capture');
      try {
        captureSpan.setAttributes({
          stdout_bytes: process.stdout.length,
          stderr_bytes: process.stderr.length,
          logs_count: countLogLines(process.stdout + process.stderr)
        });
      } finally {
        captureSpan.end();
      }

      // Cleanup
      const cleanupSpan = tracer.startSpan('sandbox.cleanup');
      try {
        const cleanupStart = performance.now();
        await cleanupSandbox(executionId);
        cleanupSpan.setAttributes({
          cleanup_time_ms: performance.now() - cleanupStart,
          resources_freed_mb: process.memory / 1024 / 1024
        });
      } finally {
        cleanupSpan.end();
      }

      span.setStatus({ code: SpanStatusCode.OK });
      return {
        executionId,
        stdout: process.stdout,
        stderr: process.stderr,
        exitCode: process.exitCode
      };
    } catch (error) {
      span.recordException(error);
      
      // Classify error for better debugging
      let errorType = 'unknown';
      if (isTimeoutError(error)) errorType = 'timeout';
      else if (isOOMError(error)) errorType = 'oom';
      else if (isCrashError(error)) errorType = 'crash';
      
      span.setAttribute('error_type', errorType);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: String(error)
      });
      
      throw error;
    } finally {
      span.end();
    }
  });
}
```

---

## Trace Export & Storage

### Jaeger Configuration

```yaml
# docker-compose.yml for local development
version: '3.8'
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "14268:14268"  # HTTP collector
      - "6831:6831/udp" # Thrift compact
    environment:
      COLLECTOR_OTLP_ENABLED: "true"
      COLLECTOR_OTLP_HOST_PORT: ":4317"
    volumes:
      - jaeger-data:/badger

  # OTEL Collector (optional, for preprocessing)
  otel-collector:
    image: otel/opentelemetry-collector-k8s:latest
    ports:
      - "4317:4317"  # OTLP gRPC
      - "4318:4318"  # OTLP HTTP
    volumes:
      - ./otel-collector-config.yaml:/etc/otel/config.yaml
    command:
      - "--config=/etc/otel/config.yaml"

volumes:
  jaeger-data:
```

### OTEL Collector Configuration

```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    send_batch_size: 512
    timeout: 5s
  
  # Sampling at collector level
  probabilistic_sampler:
    sampling_percentage: 20  # 20% of traces
  
  # Add resource attributes
  resource_detection:
    detectors:
      - system
      - docker
      - env
  
  # Sensitive data filtering
  attributes:
    actions:
      - key: "user_password"
        action: delete
      - key: "api_key"
        action: delete
      - key: "code"
        pattern: ".*secret.*"
        action: delete

exporters:
  jaeger:
    endpoint: "jaeger:14250"
    tls:
      insecure: true
  
  logging:
    loglevel: debug

service:
  pipelines:
    traces:
      receivers:
        - otlp
      processors:
        - batch
        - probabilistic_sampler
        - attributes
        - resource_detection
      exporters:
        - jaeger
        - logging
```

---

## Trace Queries & Analysis

### Jaeger UI Queries

**Find slow feature executions:**
```
service.name="uitkit-features" AND operation="feature.execution" AND duration>2000
```

**Find failed SVG renders:**
```
service.name="uitkit-svg-inspector" AND operation="svg.render" AND error=true
```

**Find sandbox timeouts:**
```
service.name="uitkit-sandbox" AND operation="sandbox.execution" AND error_type="timeout"
```

**Find theme switches by user:**
```
service.name="uitkit-ui" AND operation="theme.switch" AND baggage.userId="alice"
```

### Trace Analysis Dashboards

**Grafana dashboard for trace metrics:**
```json
{
  "dashboard": {
    "title": "UitKit Distributed Traces",
    "panels": [
      {
        "title": "Feature Execution P95 Duration",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(feature_execution_duration_seconds_bucket[5m]))"
          }
        ]
      },
      {
        "title": "SVG Render Success Rate",
        "targets": [
          {
            "expr": "sum(rate(svg_render_duration_seconds_count[5m])) / sum(rate(svg_render_duration_seconds_count{error=~\".*\"}[5m]))"
          }
        ]
      },
      {
        "title": "Sandbox Execution Breakdown by Runtime",
        "targets": [
          {
            "expr": "sum by (runtime) (rate(sandbox_execution_duration_seconds_count[5m]))"
          }
        ]
      }
    ]
  }
}
```

---

## Best Practices

1. **Span naming:** Use lowercase `operation.phase` format (e.g., `feature.run`, `sandbox.cleanup`).
2. **Attribute cardinality:** Avoid high-cardinality attributes (user IDs, request IDs) in root span; use baggage instead.
3. **Error handling:** Always record exceptions and set error status; include error type/classification.
4. **Context propagation:** Preserve trace context across async boundaries and process spawns.
5. **Sampling:** Start conservative (5-10% root), increase per-operation for high-value paths.
6. **PII:** Filter sensitive attributes (passwords, API keys, code content) at collector level.
7. **Storage:** Jaeger Badger backend for development; production should use Elasticsearch or cloud service.

---

## Troubleshooting

| Issue | Diagnosis | Resolution |
|-------|-----------|-----------|
| Traces not appearing | Check exporter endpoint, sampling rate | Verify `OTEL_EXPORTER_OTLP_ENDPOINT` set; increase sampling |
| High trace volume | Sampling rate too high | Reduce `root_sampling_rate` or per-operation rates |
| Missing context in async | Context not propagated | Use `withContext()` wrapper for async callbacks |
| Slow span creation | Tracer overhead | Batch span processing, reduce attributes cardinality |
| OOM in collector | Traces too large | Add attribute filtering, increase batch timeout |
