import * as React from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import { LogFile, handleShareLogs } from 'react-native-logfile-share';

export default function App() {
  React.useEffect(() => {
    LogFile.writeLog('mensagem teste', 'label teste');
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleShareLogs}>
        <Text>Compartilhar logs</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
