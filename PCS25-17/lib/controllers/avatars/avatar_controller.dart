import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:get/get.dart';
import 'package:sih_2022/widgets/Avatars/avatars_model.dart';
// import 'package:sih_2022/widgets/article/article_page_card.dart';
// import 'package:sih_2022/widgets/article/article_page_card.dart';

// late bool loadingstatus = true;

class AvatarController extends GetxController {
  List<AvatarList> productData = [];
  @override
  void onInit() {
    getAllData();
    super.onInit();
  }

  Future<List<AvatarList>> getAllData() async {
    await Future.delayed(const Duration(milliseconds: 1));
    var val = await FirebaseFirestore.instance.collection("Avatars").get();
    var documents = val.docs;
    if (documents.isNotEmpty) {
      return productData = documents.map((document) {
        AvatarList bookingList =
            AvatarList.fromJson(Map<String, dynamic>.from(document.data()));
        update();
        return bookingList;
      }).toList();
    }

    return [];
  }
}
