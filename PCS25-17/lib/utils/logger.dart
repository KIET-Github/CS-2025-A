import 'package:logger/logger.dart';

class AppLogger {
  static final logger = Logger(
    printer: PrettyPrinter(
        methodCount: 2,
        errorMethodCount: 8,
        lineLength: 200,
        colors: true,
        printEmojis: true,
        printTime: false),
  );

  static void i(dynamic message) {
    logger.i(message);
  }

  static void d(dynamic message) {
    logger.d(message);
  }

  static void w(dynamic message) {
    logger.w(message);
  }

  static void e(dynamic message) {
    logger.e(message);
  }

  static void wtf(dynamic message) {
    logger.wtf(message);
  }
}
