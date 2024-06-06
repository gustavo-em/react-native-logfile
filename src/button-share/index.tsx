import { Platform } from 'react-native';
import Share from 'react-native-share';
import LogFile from '../logs';

const handleShareLogs = async () => {
  try {
    const logFilePath = LogFile.getLogFilePath();
    const logFileUri =
      Platform.OS === 'ios' ? logFilePath : `file://${logFilePath}`;
    const options = {
      url: logFileUri,
      type: 'text/plain', // Tipo de arquivo a ser compartilhado
      title: 'Compartilhar Logs',
      message: 'logs',
    };

    await Share.open(options);
  } catch (error) {
    console.error(`\x1b[31mError sharing log file: ${error}\x1b[0m`);
  }
};

export default handleShareLogs;
