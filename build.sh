# Clone the repo to your local environment
# Move to proactive-jupyterlab-extension directory
# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension link .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
# Uninstall
# jupyter labextension uninstall proactive-jupyterlab-extension
