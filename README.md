<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="20%" alt="WEATHER-WIDGET-logo">
</p>
<p align="center">
    <h1 align="center">WEATHER-WIDGET</h1>
</p>
<p align="center">
    <em>Forecasting elegance on your desktop.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/atareao/weather-widget?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/atareao/weather-widget?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/atareao/weather-widget?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/atareao/weather-widget?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The weather-widget project enhances the GNOME Shell desktop with real-time weather updates, seamlessly integrating weather information into the user's daily workflow. It provides a visually appealing and functional weather widget, offering users quick access to current weather conditions without disrupting their desktop experience.

---

##  Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Based on <code>TypeScript</code> for strong typing and modern JavaScript features</li><li>Utilizes <code>GJS</code> and <code>GNOME Shell</code> for desktop integration</li><li>Follows a modular design pattern for extensibility and maintainability</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Includes <code>ESLint</code> for code linting and enforcing coding standards</li><li>Uses <code>eslint-plugin-jsdoc</code> for documenting JSDoc comments</li><li>Follows consistent coding conventions and style guidelines</li></ul> |
| 📄 | **Documentation** | <ul><li>Primary language documentation in <code>TypeScript</code></li><li>Contains detailed information on extension details, geolocation services, and weather widget implementation</li><li>Includes essential metadata in <code>metadata.json</code> for configuration reference</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates with <code>OpenMeteo API</code> for weather data retrieval</li><li>Seamless integration with <code>GNOME Shell</code> environment</li><li>Utilizes <code>GObject</code>, <code>Adw</code>, and <code>Gio</code> libraries for UI and settings management</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Separates concerns into distinct modules for extension, preferences, about, and weather widgets</li><li>Encourages reusability and easy maintenance</li><li>Facilitates extension and customization through modular components</li></ul> |
| 🧪 | **Testing**       | <ul><li>Includes testing commands using <code>npm test</code></li><li>Ensures code reliability and functionality through automated tests</li><li>Focuses on unit testing, integration testing, and possibly end-to-end testing</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimizes widget performance for smooth user experience</li><li>Efficiently manages data retrieval and UI rendering</li><li>Considers performance implications of API requests and data processing</li></ul> |
| 🛡️ | **Security**      | <ul><li>Follows secure coding practices to prevent vulnerabilities</li><li>Ensures data privacy and integrity in geolocation services</li><li>Considers security implications of external API integrations</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Manages dependencies using <code>npm</code> and <code>pnpm-lock.yaml</code></li><li>Includes essential libraries like <code>@girs/soup-3.0</code> and <code>@girs/gjs</code></li><li>Defines development and runtime dependencies in <code>package.json</code></li></ul> |

---

##  Project Structure

```sh
└── weather-widget/
    ├── .github
    │   └── workflows
    ├── LICENSE
    ├── about.ts
    ├── ambient.d.ts
    ├── assets
    │   ├── clear-day.svg
    │   ├── clear-night.svg
    │   ├── cloudy-1-day.svg
    │   ├── cloudy-1-night.svg
    │   ├── cloudy-2-day.svg
    │   ├── cloudy-2-night.svg
    │   ├── cloudy-3-day.svg
    │   ├── cloudy-3-night.svg
    │   ├── dust.svg
    │   ├── fog-day.svg
    │   ├── fog-night.svg
    │   ├── frost-day.svg
    │   ├── frost-night.svg
    │   ├── frost.svg
    │   ├── hail.svg
    │   ├── haze-day.svg
    │   ├── haze-night.svg
    │   ├── haze.svg
    │   ├── hurricane.svg
    │   ├── isolated-thunderstorms-day.svg
    │   ├── isolated-thunderstorms-night.svg
    │   ├── na.svg
    │   ├── rain-and-sleet-mix.svg
    │   ├── rain-and-snow-mix.svg
    │   ├── rainy-1-day.svg
    │   ├── rainy-1-night.svg
    │   ├── rainy-2-day.svg
    │   ├── rainy-2-night.svg
    │   ├── rainy-3-day.svg
    │   ├── rainy-3-night.svg
    │   ├── scattered-thunderstorms-day.svg
    │   ├── scattered-thunderstorms-night.svg
    │   ├── severe-thunderstorm.svg
    │   ├── snow-and-sleet-mix.svg
    │   ├── snowy-1-day.svg
    │   ├── snowy-1-night.svg
    │   ├── snowy-2-day.svg
    │   ├── snowy-2-night.svg
    │   ├── snowy-3-day.svg
    │   ├── snowy-3-night.svg
    │   ├── thunderstorm-1-day.svg
    │   ├── thunderstorm-1-night.svg
    │   ├── thunderstorm-2-day.svg
    │   ├── thunderstorm-2-night.svg
    │   ├── thunderstorm-3-day.svg
    │   ├── thunderstorm-3-night.svg
    │   ├── todo.svg
    │   ├── tornado.svg
    │   ├── tropical-storm.svg
    │   └── wind.svg
    ├── current_location.js
    ├── extension.ts
    ├── icons
    │   └── hicolor
    ├── metadata.json
    ├── package.json
    ├── pnpm-lock.yaml
    ├── prefs.ts
    ├── schemas
    │   ├── gschemas.compiled
    │   └── org.gnome.shell.extensions.weather-widget.gschema.xml
    ├── stylesheet.css
    ├── tsconfig.json
    └── widgets
        ├── icons.ts
        ├── openmeteo.ts
        └── weather_widget.ts
```


###  Project Index
<details open>
	<summary><b><code>WEATHER-WIDGET/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/about.ts'>about.ts</a></b></td>
				<td>- Implements an About page for the extension, displaying extension details, contact information, and external links<br>- Manages the layout and content of the page, including extension name, icon, version, owner details, and social media links<br>- Allows users to navigate between the main and contact pages seamlessly.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/ambient.d.ts'>ambient.d.ts</a></b></td>
				<td>Facilitates seamless integration of essential libraries for GNOME Shell extensions, enabling smooth interaction with the GNOME Shell environment.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/current_location.js'>current_location.js</a></b></td>
				<td>- Manages geolocation services to determine the current location for the Gnome Weather app<br>- Handles the retrieval of location data and updates the current location based on geoclue information<br>- Enables automatic location detection and triggers location change events within the application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/extension.ts'>extension.ts</a></b></td>
				<td>Implements a weather widget extension for GNOME Shell, adding weather information to the desktop background.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/metadata.json'>metadata.json</a></b></td>
				<td>- Implements a weather widget for displaying current weather information<br>- The metadata.json file contains essential details about the widget, such as the author, description, version, and settings schema<br>- This file serves as a reference point for the widget's configuration and functionality within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/package.json'>package.json</a></b></td>
				<td>- Manages dependencies and project metadata for the weather widget, ensuring proper versioning, licensing, and authorship details<br>- It also defines development and runtime dependencies, including tools like ESLint and TypeScript, and essential libraries for GJS, GNOME Shell, and Soup.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/pnpm-lock.yaml'>pnpm-lock.yaml</a></b></td>
				<td>- The `pnpm-lock.yaml` file in the project serves as a lockfile to manage dependencies and ensure consistent package versions across the codebase<br>- It specifies the versions of packages required for the project, including settings for auto-installing peers and excluding certain links from the lockfile<br>- This file plays a crucial role in maintaining a stable and reproducible project architecture by defining the exact package versions needed for successful execution.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/prefs.ts'>prefs.ts</a></b></td>
				<td>- Defines WeatherWidgetPreferences class extending ExtensionPreferences to manage extension preferences<br>- Implements methods to fill preferences window with settings and build general appearance page<br>- Binds latitude and longitude settings to UI elements for user configuration<br>- Integrates with Gtk, GObject, Adw, and Gio libraries for UI and settings management.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/stylesheet.css'>stylesheet.css</a></b></td>
				<td>Define the visual styling for temperature display in the project's CSS file.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/tsconfig.json'>tsconfig.json</a></b></td>
				<td>- Enables NodeNext module resolution and compiles ES2022 code to the dist directory<br>- Includes specific files for extension, preferences, about, and weather widgets in the project.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- schemas Submodule -->
		<summary><b>schemas</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/schemas/gschemas.compiled'>gschemas.compiled</a></b></td>
				<td>- Defines the schema for GNOME Shell weather widget extension settings, specifying units, positions, and visibility options<br>- This file compiles the schema into a format that can be used by the extension to manage user preferences and display weather information accurately within the GNOME Shell environment.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- widgets Submodule -->
		<summary><b>widgets</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/widgets/icons.ts'>icons.ts</a></b></td>
				<td>- Defines icon interface and conditions for weather icons<br>- Retrieves the corresponding icon based on a given code<br>- The file 'icons.ts' manages the mapping between weather conditions and icon files, ensuring accurate representation in the UI.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/widgets/openmeteo.ts'>openmeteo.ts</a></b></td>
				<td>- Enables retrieval of current weather data based on specified location and units<br>- Handles API requests, updates data, and provides methods to access temperature, humidity, and weather code<br>- Facilitates seamless integration of weather information into the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/atareao/weather-widget/blob/master/widgets/weather_widget.ts'>weather_widget.ts</a></b></td>
				<td>- Implements a WeatherWidget class that displays weather information<br>- Handles updating weather data, positioning on the screen, and enabling drag functionality<br>- Utilizes OpenMeteo API for weather data retrieval and custom icons for display<br>- Maintains settings synchronization and screen boundary checks for widget positioning.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- .github Submodule -->
		<summary><b>.github</b></summary>
		<blockquote>
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/atareao/weather-widget/blob/master/.github/workflows/eslint.yml'>eslint.yml</a></b></td>
						<td>- Automates ESLint scanning on main branch pushes, pull requests, and a weekly schedule<br>- Installs ESLint and a custom formatter, runs linting, and uploads results to GitHub for analysis.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with weather-widget, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm


###  Installation

Install weather-widget using one of the following methods:

**Build from source:**

1. Clone the weather-widget repository:
```sh
❯ git clone https://github.com/atareao/weather-widget
```

2. Navigate to the project directory:
```sh
❯ cd weather-widget
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run weather-widget using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


###  Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
##  Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/atareao/weather-widget/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/atareao/weather-widget/issues)**: Submit bugs found or log feature requests for the `weather-widget` project.
- **💡 [Submit Pull Requests](https://github.com/atareao/weather-widget/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/atareao/weather-widget
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/atareao/weather-widget/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=atareao/weather-widget">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
