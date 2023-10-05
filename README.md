<h1 align="center">
  <br>
  <a href="https://openpecha.org"><img src="https://avatars.githubusercontent.com/u/82142807?s=400&u=19e108a15566f3a1449bafb03b8dd706a72aebcd&v=4" alt="OpenPecha" width="150"></a>
  <br>
</h1>

<h3 align="center">Post Editing tool for Pecha.tools</h3>

## Project owner(s)

<!-- Link to the repo owners' github profiles -->

- [@tenkus47](https://github.com/tenkus47)

# Tibetan-English Remix Translation App

Welcome to the Tibetan-English Post Editing Tool! This project is designed to provide an easy and efficient way to translate Tibetan text to English and vice versa using a combination of APIs from Dharma Mitra, ChatGPT, and Bing Translate. Whether you're a student, researcher, or simply curious about Tibetan culture and language, this app will help bridge the language gap and make translation a breeze.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

  - [Uploading a CSV File](#uploading-a-csv-file)

- [File Format](#file-format)
- [Contributing](#contributing)

## Getting Started

Before you can start using the Tibetan-English Remix Translation App, there are a few prerequisites and installation steps to follow.

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/OpenPecha/pecha-tool-for-post-editing.git
   ```

2. Change into the project directory:

   ```bash
   cd pecha-tool-for-post-editing
   ```

3. Install the required npm packages:

   ```bash
   npm install
   ```

4. Set up your API keys:

   - Obtain an API key from Bing Translate and replace `<BING_TRANSLATE_API_KEY>` in the `.env` file with your actual API key.

5. Start the application:

   ```bash
   npm start
   ```

Now, your Tool should be up and running!

## Usage

### Uploading a CSV File

To get started with translation, you'll need to upload a CSV file . The CSV file should have a column named "paragraph" containing the text you want to translate. Here's an example of what the CSV file format should look like:

```csv
paragraph
བཀྲ་ཤིས་བདེ་ལེགས
དྲིན་ཆེན་རྩ་ཚིག
རྒྱུ་རྐྱ་རིན་པོ
```

## File Format

The CSV file format for input should adhere to the following structure:

- Column Name: "paragraph"
- Each row should contain the text you want to translate,

Ensure that your CSV file follows this format for a smooth translation experience.

## Contributing

We welcome contributions from the community to improve this translation app. If you have any suggestions, bug reports, or want to add new features, please feel free to open an issue or submit a pull request on our GitHub repository.
