// // ignore_for_file: prefer_const_constructors

// import 'package:cloud_firestore/cloud_firestore.dart';

// import 'package:get/get.dart';
// import 'package:sih_2022/models/timeline_model.dart';

// class CommunityForumController extends GetxController {
//   List<TimeLineList> productData = [];
//   @override
//   void onInit() {
//     getAllData();
//     super.onInit();
//   }

//   Future<List<TimeLineList>> getAllData() async {
//     await Future.delayed(Duration(milliseconds: 1));

//     var val = await FirebaseFirestore.instance.collection("timelines").get();
//     var documents = val.docs;
//     if (documents.isNotEmpty) {
//       return productData = documents.map((document) {
//         TimeLineList bookingList =
//             TimeLineList.fromJson(Map<String, dynamic>.from(document.data()));
//         update();
//         return bookingList;
//       }).toList();
//     }
//     return [];
//   }
// }
