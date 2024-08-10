# Monique's GPS TRACKER & REPORTER

## Notes about this [Angular 18]() project

- [package.json](https://nodesource.com/blog/the-basics-of-package-json/)
  - the project configuration file used by node based projects.
  - To start the website, you will need to open a terminal and run the following command
  
    ```shell
    npm run start
    ```

- vscode-extensions.log
    - From the root of the project, run the following to install the recommneded VSCode extensions.

        ```shell
        cat vscode-extensions.log | xargs -n 1 code --install-extension 
        ```

    - From the root of the project, run the following to update the list of recommended VSCode extension with your current extensions.    

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

    - [.gitignore](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files)

        this file tells git to ignore certain files