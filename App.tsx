// Copyright (c) Jon Thysell <http://jonthysell.com>
// Licensed under the MIT License.

import { SafeAreaProvider } from "react-native-safe-area-context";
import MainView from "./components/MainView";

export default function App() {
  return (
    <SafeAreaProvider>
      <MainView />
    </SafeAreaProvider>
  );
}
