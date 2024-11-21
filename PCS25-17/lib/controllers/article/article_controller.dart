import 'package:cloud_firestore/cloud_firestore.dart';

import 'package:get/get.dart';
// import 'package:sih_2022/widgets/article/article_page_card.dart';
import 'package:sih_2022/widgets/article/article_page_card.dart';

// late bool loadingstatus = true;

class ArticleController extends GetxController {
  List<ArticleList> productData = [];
  @override
  void onInit() {
    getAllData();
    super.onInit();
  }

  Future<List<ArticleList>> getAllData() async {
    await Future.delayed(const Duration(milliseconds: 1));
    var val = await FirebaseFirestore.instance.collection("articles").get();
    var documents = val.docs;
    if (documents.isNotEmpty) {
      return productData = documents.map((document) {
        ArticleList bookingList =
            ArticleList.fromJson(Map<String, dynamic>.from(document.data()));
        update();
        return bookingList;
      }).toList();
    }
    return [];
  }
}
