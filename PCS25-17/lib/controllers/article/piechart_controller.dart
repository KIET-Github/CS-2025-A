import 'package:get/get.dart';
import 'package:sih_2022/controllers/controllers.dart';

class PieChartController extends GetxController {
  int key1 = 0;
  Map<String, double> catMap = {'No of questions attempted': 0};
  void getAllData() {
    Get.lazyPut(() => ProfileController());
    final controllerw = Get.put(ProfileController());
    while (key1 < controllerw.allRecentTest.length) {
      if (key1 == 0) {
        catMap["Cognitive"] = controllerw.allRecentTest[key1].points as double;
      } else if (key1 == 1) {
        catMap['Psychomotor'] =
            controllerw.allRecentTest[key1].points as double;
      } else if (key1 == 2) {
        catMap["Affective"] = controllerw.allRecentTest[key1].points as double;
      }
      // catMap[controllerw.allRecentTest[key1].papername as String] =
      //     controllerw.allRecentTest[key1].points as double;

      key1 = (key1 + 1);
    }
    update();
  }
}
