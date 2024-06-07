import RNFS from 'react-native-fs';
import CryptoJS from 'crypto-js';
const LOG_FILE_PATH = `${RNFS.DocumentDirectoryPath}/app-logs.txt`;
const MAX_LOG_MESSAGE_LENGTH = 3000;
const MAX_LOG_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ENCRYPTED_LOG_FILE_PATH = `${RNFS.DocumentDirectoryPath}/app-logs-encrypted.txt`;
const ENCRYPTION_KEY = 'TESTE555'; // Use uma chave segura

const LogFile = {
  writeLog: async (message: string, label: string) => {
    if (message.length > MAX_LOG_MESSAGE_LENGTH) {
      message = message.substring(0, MAX_LOG_MESSAGE_LENGTH);
    }

    const logMessage = `   [${new Date().toISOString()}] 
                        \n [${label}] 
                        \n ${message}
                        \n ------------------------
                        \n
 `;

    try {
      const fileStats = await RNFS.stat(LOG_FILE_PATH);
      if (fileStats.size > MAX_LOG_FILE_SIZE) {
        await RNFS.unlink(LOG_FILE_PATH);
      }
    } catch (error) {
      // File does not exist or other error, ignore
    }

    try {
      await RNFS.appendFile(LOG_FILE_PATH, logMessage, 'utf8');
      console.log(`\x1b[32mLog written: ${logMessage}\x1b[0m`);
    } catch (error) {
      console.error(`\x1b[31mError writing log: ${error}\x1b[0m`);
    }
  },

  getLogs: async (): Promise<string> => {
    try {
      const logs = await RNFS.readFile(LOG_FILE_PATH, 'utf8');
      return logs;
    } catch (error) {
      console.error(`\x1b[31mError reading logs: ${error}\x1b[0m`);
      return '';
    }
  },

  deleteLogs: async () => {
    try {
      await RNFS.unlink(LOG_FILE_PATH);
      console.log('\x1b[32mLog file deleted\x1b[0m');
    } catch (error) {
      console.error(`\x1b[31mError deleting log file: ${error}\x1b[0m`);
    }
  },

  getLogFilePath: (): string => {
    return LOG_FILE_PATH;
  },

  encryptLogFile: async () => {
    try {
      const logContent = await RNFS.readFile(LOG_FILE_PATH, 'utf8');
      const encryptedContent = CryptoJS.AES.encrypt(
        logContent,
        ENCRYPTION_KEY
      ).toString();
      await RNFS.writeFile(ENCRYPTED_LOG_FILE_PATH, encryptedContent, 'utf8');
      console.log(`\x1b[32mLog file encrypted\x1b[0m`);
      return ENCRYPTED_LOG_FILE_PATH;
    } catch (error) {
      console.error(`\x1b[31mError encrypting log file: ${error}\x1b[0m`);
      throw error;
    }
  },
};

export default LogFile;
