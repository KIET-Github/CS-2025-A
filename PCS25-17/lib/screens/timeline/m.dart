// // ignore_for_file: avoid_print, prefer_const_constructors, camel_case_types, unused_field, prefer_final_fields, unnecessary_string_interpolations

// import 'package:flutter/material.dart';
// import 'package:transliteration/response/transliteration_response.dart';
// import 'package:transliteration/transliteration.dart';

// Languages? from = Languages.ENGLISH;

// class demopage extends StatefulWidget {
//   const demopage({Key? key}) : super(key: key);

//   @override
//   State<demopage> createState() => _demopageState();
// }

// final List<String> _mesaures = [
//   'HINDI',
//   'GREEK',
//   'GUJRATI',
//   'ENGLISH',
// ];
// final Map<String, Languages> mesauresMap = {
//   'HINDI': Languages.HINDI,
//   'GREEK': Languages.GREEK,
//   'GUJRATI': Languages.GUJARATI,
//   'ENGLISH': Languages.ENGLISH,
// };

// class _demopageState extends State<demopage> {
//   String text = "What are you doing";
//   String hindi = 'My Name is Ayush Kumar Singh';
//   int _counter = 0;
//   String tolan = "ENGLISH";

//   setHindi(Languages lan) async {
//     TransliterationResponse? _response =
//         await Transliteration.transliterate(text, lan);

//     hindi = lan == Languages.ENGLISH
//         ? text
//         : _response!.transliterationSuggestions[0];

//     setState(() {});
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Material(
//       child: Center(
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             DropdownButton(
//               items: _mesaures
//                   .map((String value) => DropdownMenuItem<String>(
//                         child: Row(
//                           children: [
//                             Text(value, style: TextStyle(fontSize: 20.00)),
//                             SizedBox(
//                               width: 25,
//                             )
//                           ],
//                         ),
//                         value: value,
//                       ))
//                   .toList(),
//               onChanged: (value) {
//                 setState(() {
//                   tolan = value.toString();
//                   print(tolan);

//                   from = mesauresMap[tolan];
//                   setHindi(from!);
//                 });
//               },
//               iconSize: 15,
//               elevation: 16,
//               underline: Container(
//                   decoration: ShapeDecoration(
//                       shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.all(Radius.circular(6.0)),
//                           side: BorderSide(
//                             width: 0.5,
//                             style: BorderStyle.solid,
//                           )))),
//               value: tolan,
//             ),
//             Text(
//               "$hindi",
//               style: TextStyle(color: Colors.black),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }
