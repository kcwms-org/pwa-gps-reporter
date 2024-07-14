# Monique's GPS TRACKER & REPORTER

## Notes about the project

- [package.json](https://nodesource.com/blog/the-basics-of-package-json/)
  - the project configuration file used by node projects. The important thing here are the scripts.
  - we are using the http-server package to run a webserver on your local machine
    - To debug your site, you will need to open a terminal under ~/repos/github/pwa-gps-reporter/ and run 
        ```shell
        npm run http-server .
        ```
    - and then start the [debugger](https://code.visualstudio.com/docs/editor/debugging)


- vscode-extensions.log
    - run the following to install the recommneded VSCode extensions

        ```shell
        cat vscode-extensions.log | xargs -n 1 code --install-extension 
        ```

    - update the list of recommended VSCode extension.    

        ```shell
        code --list-extensions > vscode-extensions.log
        ```

- .vscode/[settings.json](https://code.visualstudio.com/docs/getstarted/settings)
  - some recommended settings for VSCode editor specifically. You typically want these in your user settings file at ~/.config/Code/User/settings.json.

- .vscode/[launch.json](https://code.visualstudio.com/docs/editor/debugging)

    - VSCode does not support debugging with browser's installed via [snaps](https://snapcraft.io/) or [flatpak](https://flathub.org/), without serious user intervention. Since the firefox [deb package actually installs via snaps](https://www.omgubuntu.co.uk/2022/04/how-to-install-firefox-deb-apt-ubuntu-22-04), our only choice is to install the chrome [deb package](https://www.google.com/chrome/browser-tools/)

        1. uninstall chrome **flatpak**

            - 
                ```shell
                flatpak uninstall com.google.Chrome
                ```

        2. install chrome using deb package

            - download from https://www.google.com/chrome/browser-tools/
            - find the file you just downloaded and right click 
            - select Open With >> Discover
            - inside of Discover press the "Install" button

    - .gitignore

        this file tells git to ignore certain files