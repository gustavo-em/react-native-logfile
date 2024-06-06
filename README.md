# react-native-logfile-share

A biblioteca `react-native-logfile-share` é uma solução simples para gerenciar logs em aplicativos React Native e compartilhá-los facilmente.

## Instalação

Para instalar a `react-native-logfile-share`, você pode usar o npm ou o yarn.

### npm

```bash
npm install react-native-logfile-share
```

### yarn

```bash
yarn add react-native-logfile-share
```

```javascript
import LogFileShare from 'react-native-logfile-share';

// Escrever um log
LogFileShare.writeLog('Mensagem de log', 'Label');


// Compartilhar logs
<Button
    title="Compartilhar Logs"
    onPress={LogFileShare.handleShareLogs();}
/>
```
