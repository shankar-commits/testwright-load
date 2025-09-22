# testwright-load

Sample project for load testing with Artillery & Playwright.

## Prerequisites

1. **Install:**

   - [Node.js v22](https://nodejs.org/en/download)
   - [Visual Studio Code](https://code.visualstudio.com/download)

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running Tests

1. Add test functions in [processor.ts](./tests/processor.ts)
2. Define your requirements in [test.yml](./tests/test.yml) for load test
3. Trigger the tests by running,

   ```sh
   npm run load-test
   ```

4. Output json should be present in artifacts folder.
