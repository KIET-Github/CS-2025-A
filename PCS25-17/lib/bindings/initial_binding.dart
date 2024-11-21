import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';
import 'package:sih_2022/services/notification/notification_service.dart';

import '../services/firebase/firebasestorage_service.dart';

class InitialBinding implements Bindings {
  @override
  void dependencies() {
    // Get.put(LanguageController());
    Get.put(AuthController(), permanent: true);

    Get.put(NotificationService());
    Get.lazyPut(() => FireBaseStorageService());
  }
}
