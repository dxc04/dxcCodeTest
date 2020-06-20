
## Project Structure

```
├── android
├── app.json
├── assets                               // All assets: images, videos, ...
├── credentials                          // Private informations: API keys,...
├── index.js
├── ios
├── publishing                           // Icon, screenshots, preview,... for App Store & Play Store
└── src
    ├── __tests__                        // Unit tests
    │   ├── App.test.tsx                 // App component's tests
    │   ├── components
    │   │   └── MyComponent.test.txs
    │   └── ...
    ├── App.tsx
    ├── actions                          // Actions
    │   ├── actionTypes.ts               // Action types
    │   └── app.ts                       // appReducer's actions
    ├── components                       // Components
    │   └── MyComponent.tsx
    ├── constants                        // Colors, sizes, routes,...
    │   └── strings.ts                   // i18n
    ├── containers                       // Screens, pages,...
    ├── lib                              // Libraries, services,...
    ├── index.tsx                        // Root component
    ├── reducers                         // Reducers
    │   └── app.ts                       // appReducer
    ├── sagas                            // Redux sagas
    ├── store.ts
    ├── types                            // Type declarations
    │   └── index.d.ts
    └── utils                            // Utilities
```

## Manual Installation

- Clone this repo

  ```
  cd <PROJECT_NAME>
  ```

- Install dependencies
  ```
  yarn
  ```
