// import 'package:easy_separator/easy_separator.dart';
// import 'package:flutter/material.dart';
// import 'package:get/get.dart';
// import 'package:sih_2022/configs/themes/app_colors.dart';
// import 'package:sih_2022/screens/home/home_screen.dart';
// import 'package:sih_2022/widgets/common/circle_button.dart';

// class AppIntroductionScreen extends StatelessWidget {
//   const AppIntroductionScreen({Key? key}) : super(key: key);
//   static const String routeName = '/introduction';
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Container(
//         alignment: Alignment.center,
//         decoration: BoxDecoration(gradient: mainGradient(context)),
//         child: Padding(
//           padding: EdgeInsets.symmetric(horizontal: Get.width * 0.2),
//           child: EasySeparatedColumn(
//             separatorBuilder: (context, index) => const SizedBox(
//               height: 40,
//             ),
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               const Icon(
//                 Icons.home,
//                 size: 65,
//                 color: kOnSurfaceTextColor,
//               ),
//               const Text(
//                 'This is an App Created By Ayush Kumar Singh',
//                 textAlign: TextAlign.center,
//                 style: TextStyle(
//                     fontSize: 18,
//                     color: kOnSurfaceTextColor,
//                     fontWeight: FontWeight.bold),
//               ),
//               CircularButton(
//                   onTap: () => Get.offAndToNamed(HomeScreen.routeName),
//                   child: const Icon(
//                     Icons.arrow_forward,
//                     size: 35,
//                     color: Colors.white,
//                   ))
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
