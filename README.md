# git-tool

CLI access for git providers (Gitlab, Bitbucket or Github) to manage your repositories,

## Usage

```text
git-tool <command>

Commands:
  git-tool credentials <action> [params..]  Manage saved credentials
  git-tool create <name>                    create new project and clone it
  git-tool get <id>                         get inromation about a project by id (or path)
  git-tool rm <id>                          delete project by id (or path)
  git-tool ls                               list all projects
  git-tool completion                       generate bash completion script

Options:
  --backend, -B  Backend provider                           [choices: "bitbucket", "gitlab", "github"]
  -v, --verbose  Show more information                      [count]
  -s, --silent   No output                                  [boolean]
  -d, --debug    Debug mode (stacktraces, very verbose)     [boolean]
  -h, --help     Show help                                  [boolean]
  -V, --version  Show version number                        [boolean]
```