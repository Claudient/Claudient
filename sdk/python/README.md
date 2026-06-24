# UitKit Python SDK

A production-grade Python SDK for integrating UitKit skills, agents, and MCP servers into your applications.

## Features

- **Skills Management**: Discover, install, and execute UitKit skills
- **Agents Orchestration**: Run specialized agents with tool use and state management
- **MCP Integration**: Connect to and communicate with Model Context Protocol servers
- **Context Managers**: Automatic resource cleanup and lifecycle management
- **Exception Hierarchy**: Type-safe error handling with semantic exceptions
- **Logging Integration**: Structured logging with request/response tracking
- **Session State**: Persistent agent conversation history and session management

## Installation

```bash
pip install uitkit-sdk
```

Or from source:

```bash
pip install -e /path/to/UitKit/sdk/python
```

## Quick Start

### Prerequisites

- Python 3.10+
- `ANTHROPIC_API_KEY` environment variable set

### Basic Usage

```python
from uitkit_sdk import SkillsClient, AgentsClient, MCPClient

# Skills Management
with SkillsClient() as skills:
    # Discover skills
    recommendations = skills.consult("build REST API with auth")
    
    # Install a skill
    installed = skills.install("backend/fastapi-expert")
    
    # List installed skills
    for skill in skills.list_installed():
        print(f"✓ {skill.name} v{skill.version}")

# Agent Execution
with AgentsClient() as agents:
    # Register a tool
    agents.register_tool("Calculator", lambda x: str(eval(x["expression"])))
    
    # Run agent
    result = agents.run(
        system="You are a helpful assistant",
        messages=[{"role": "user", "content": "What is 5 + 3?"}],
    )
    print(result["response"])

# MCP Servers
with MCPClient() as mcp:
    # Discover servers
    for server in mcp.discover():
        print(f"  - {server.name}")
    
    # Connect to server
    fs = mcp.connect("filesystem")
    
    # Call server method
    response = mcp.call("filesystem", "read_file", {"path": "/etc/hosts"})
```

## Clients

### SkillsClient

Manage and discover UitKit skills from the 400+ skill catalog.

#### Methods

- `search(query: str, limit: int = 10) -> List[Skill]` — Search skills by name/tags
- `consult(user_query: str) -> Dict[str, Any]` — Get skill recommendations
- `install(skill_id: str, force: bool = False) -> Skill` — Install a skill
- `uninstall(skill_id: str) -> bool` — Uninstall a skill
- `list_installed() -> List[Skill]` — List installed skills
- `list_catalog(category: Optional[str] = None) -> List[Skill]` — Browse catalog
- `get(skill_id: str) -> Optional[Skill]` — Get skill by ID

#### Example

```python
from uitkit_sdk import SkillsClient

with SkillsClient() as skills:
    # Search for skills
    results = skills.search("testing", limit=5)
    for skill in results:
        print(f"  - {skill.name}: {skill.description}")
    
    # Get recommendations
    recs = skills.consult("I need to build a web scraper with async patterns")
    
    # Install multiple skills
    for skill_data in recs["recommended_skills"]:
        installed = skills.install(skill_data["id"])
        print(f"✓ Installed: {installed.name}")
```

### AgentsClient

Execute agents with tool use, state management, and agentic loops.

#### Methods

- `run(system: str, messages: List[Dict], tools: Optional[List] = None, ...) -> Dict` — Run agent
- `register_tool(name: str, handler: Callable) -> None` — Register a tool
- `get_agent(agent_id: str) -> Optional[Agent]` — Get agent by ID
- `list_agents() -> List[Agent]` — List all agents

#### Tool Registration

```python
from uitkit_sdk import AgentsClient
import subprocess

with AgentsClient() as agents:
    # Register a Bash tool
    def bash_handler(input_dict):
        result = subprocess.run(
            input_dict["command"],
            shell=True,
            capture_output=True,
            text=True,
        )
        return result.stdout + result.stderr
    
    agents.register_tool("Bash", bash_handler)
    
    # Run agent with tool
    result = agents.run(
        system="You are a helpful bash assistant",
        messages=[{"role": "user", "content": "List files in /tmp"}],
        tools=[{
            "name": "Bash",
            "description": "Execute shell commands",
            "input_schema": {
                "type": "object",
                "properties": {"command": {"type": "string"}},
                "required": ["command"],
            }
        }],
    )
```

#### Session Management

```python
with AgentsClient() as agents:
    # Create a session for multi-turn conversation
    session_id = "user-123-session"
    
    # First turn
    result1 = agents.run(
        system="You are a helpful assistant",
        messages=[{"role": "user", "content": "What's your name?"}],
        session_id=session_id,
    )
    
    # Second turn - automatically includes previous messages
    result2 = agents.run(
        system="You are a helpful assistant",
        messages=[{"role": "user", "content": "Do you remember what we discussed?"}],
        session_id=session_id,
    )
```

### MCPClient

Manage Model Context Protocol (MCP) servers for extended capabilities.

#### Methods

- `discover() -> List[MCPServer]` — List all available MCP servers
- `connect(server_id: str, config: Optional[Dict] = None) -> MCPServer` — Connect to server
- `disconnect(server_id: str) -> bool` — Disconnect from server
- `call(server_id: str, method: str, params: Optional[Dict] = None) -> Dict` — Call server method
- `get_capabilities(server_id: str) -> List[str]` — Get server capabilities
- `list_connected() -> List[MCPServer]` — List connected servers

#### Example

```python
from uitkit_sdk import MCPClient

with MCPClient() as mcp:
    # Discover available servers
    for server in mcp.discover():
        print(f"  - {server.name} ({server.type})")
        print(f"    Capabilities: {', '.join(server.capabilities)}")
    
    # Connect to multiple servers
    mcp.connect("filesystem")
    mcp.connect("github", config={"env": {"GITHUB_TOKEN": "ghp_..."}})
    
    # Call server methods
    result = mcp.call("filesystem", "read_file", {"path": "README.md"})
    
    # Check capabilities
    caps = mcp.get_capabilities("github")
    
    # List connected servers
    for server in mcp.list_connected():
        print(f"✓ {server.name}")
```

## Error Handling

The SDK provides a semantic exception hierarchy for type-safe error handling.

### Exception Types

```python
from uitkit_sdk import (
    UitKitException,           # Base exception
    SkillNotFoundError,          # Skill lookup failed
    SkillInstallationError,      # Skill installation failed
    AgentExecutionError,         # Agent execution failed
    ToolExecutionError,          # Tool call failed
    MCPConnectionError,          # MCP connection failed
    MCPServerError,              # MCP server error
    InvalidConfigurationError,   # Invalid config
    TokenBudgetExceededError,    # Token limit exceeded
)
```

### Handling Errors

```python
from uitkit_sdk import SkillsClient, SkillNotFoundError

try:
    with SkillsClient() as skills:
        skills.install("nonexistent/skill")
except SkillNotFoundError as e:
    print(f"Skill not found: {e.message}")
    print(f"Error code: {e.code}")
    print(f"Details: {e.details}")
except Exception as e:
    print(f"Unexpected error: {e}")
```

## Logging

The SDK integrates structured logging with configurable levels.

```python
import logging
from uitkit_sdk import SkillsClient

# Enable debug logging
with SkillsClient(debug=True) as skills:
    skills.install("backend/fastapi-expert")

# Output:
# 2026-06-22 10:15:32 [uitkit_sdk.SkillsClient] DEBUG: Starting operation: skills.install
# 2026-06-22 10:15:32 [uitkit_sdk.SkillsClient] INFO: Installed skill: backend/fastapi-expert ...
```

### Custom Logging Configuration

```python
import logging
from uitkit_sdk import _configure_logging

# Configure custom logger
logger = _configure_logging("uitkit_sdk.MyApp", level=logging.DEBUG)
logger.info("My custom message")
```

## Data Models

All clients work with typed data models:

### Skill

```python
@dataclass
class Skill:
    id: str                          # e.g., "backend/fastapi-expert"
    name: str
    category: str
    description: str
    version: str = "1.0.0"
    tags: List[str] = []
    installed: bool = False
    last_updated: Optional[str] = None
    install_path: Optional[str] = None
    metadata: Dict[str, Any] = {}
```

### Agent

```python
@dataclass
class Agent:
    id: str
    name: str
    purpose: str
    description: str
    model: str = "claude-opus-4-8"
    tools: List[Dict[str, Any]] = []
    version: str = "1.0.0"
    max_tokens: int = 16000
    metadata: Dict[str, Any] = {}
```

### MCPServer

```python
@dataclass
class MCPServer:
    id: str
    name: str
    protocol_version: str = "2024-11-05"
    type: str = "stdio"              # stdio, sse, or custom
    command: Optional[str] = None
    args: List[str] = []
    env: Dict[str, str] = {}
    capabilities: List[str] = []
    connected: bool = False
    metadata: Dict[str, Any] = {}
```

## Advanced Usage

### Multi-Agent Coordination

```python
from uitkit_sdk import AgentsClient

with AgentsClient() as agents:
    # Get specialized agents
    reviewer = agents.get_agent("code-reviewer")
    architect = agents.get_agent("architect")
    
    # Run agents in sequence
    review_result = agents.run(
        system=f"You are {reviewer.name}: {reviewer.purpose}",
        messages=[{"role": "user", "content": "Review this code..."}],
    )
    
    arch_result = agents.run(
        system=f"You are {architect.name}: {architect.purpose}",
        messages=[{"role": "user", "content": "Design the system..."}],
    )
```

### Tool Chaining

```python
from uitkit_sdk import AgentsClient

with AgentsClient() as agents:
    # Register chained tools
    agents.register_tool("ReadFile", lambda x: open(x["path"]).read())
    agents.register_tool("AnalyzeCode", lambda x: f"Analysis of: {x['code'][:100]}")
    agents.register_tool("GenerateReport", lambda x: f"Report: {x['summary']}")
    
    result = agents.run(
        system="Code analysis workflow assistant",
        messages=[{"role": "user", "content": "Analyze /src/main.py"}],
        tools=[
            {"name": "ReadFile", "description": "..."},
            {"name": "AnalyzeCode", "description": "..."},
            {"name": "GenerateReport", "description": "..."},
        ],
    )
```

### Context Caching (Future)

The SDK will support prompt caching for improved performance:

```python
# Future: automatic system prompt caching
result = agents.run(
    system="You are a helpful assistant",  # Automatically cached
    messages=[{"role": "user", "content": "Help me"}],
    enable_cache=True,
)
```

## Performance & Best Practices

1. **Reuse Clients**: Create clients once and reuse across multiple operations
   ```python
   with SkillsClient() as skills:
       for query in queries:
           skills.consult(query)
   ```

2. **Enable Debug Logging**: Use `debug=True` only during development
   ```python
   with SkillsClient(debug=True) as skills:  # Verbose logging
       ...
   ```

3. **Register Tools Once**: Register tool handlers once, reuse across multiple agent runs
   ```python
   agents.register_tool("Bash", bash_handler)
   for task in tasks:
       agents.run(..., tools=[...])
   ```

4. **Use Sessions**: Maintain conversation history with session IDs
   ```python
   agents.run(..., session_id=user_id)
   ```

## API Reference

### SkillsClient

```python
class SkillsClient(BaseClient):
    def search(query: str, limit: int = 10) -> List[Skill]
    def consult(user_query: str) -> Dict[str, Any]
    def install(skill_id: str, force: bool = False) -> Skill
    def uninstall(skill_id: str) -> bool
    def list_installed() -> List[Skill]
    def list_catalog(category: Optional[str] = None) -> List[Skill]
    def get(skill_id: str) -> Optional[Skill]
```

### AgentsClient

```python
class AgentsClient(BaseClient):
    def run(system: str, messages: List[Dict], tools: Optional[List] = None,
            agent_id: Optional[str] = None, max_iterations: int = 10,
            session_id: Optional[str] = None) -> Dict[str, Any]
    def register_tool(name: str, handler: Callable[[Dict], str]) -> None
    def get_agent(agent_id: str) -> Optional[Agent]
    def list_agents() -> List[Agent]
```

### MCPClient

```python
class MCPClient(BaseClient):
    def discover() -> List[MCPServer]
    def connect(server_id: str, config: Optional[Dict] = None) -> MCPServer
    def disconnect(server_id: str) -> bool
    def call(server_id: str, method: str, params: Optional[Dict] = None) -> Dict[str, Any]
    def get_capabilities(server_id: str) -> List[str]
    def list_connected() -> List[MCPServer]
```

## Contributing

Contributions welcome! Please:

1. Follow PEP 8 style guide
2. Add tests for new features
3. Update documentation
4. Create a pull request

## License

AGPL-3.0 (Code) / CC-BY-SA-4.0 (Content)

## Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: [uitkit.dev](https://uitkit.dev)
