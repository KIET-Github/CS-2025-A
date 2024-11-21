import 'package:flutter/material.dart';

import 'doctors_class.dart';
// ignore: unused_import
// import 'package:flutter_speciallyabled/pages/doctors_homepage.dart';
// import 'package:flutter_speciallyabled/pages/doctors_class.dart';

class Itemwid extends StatelessWidget {
  final Products item;
  // ignore: unnecessary_null_comparison
  const Itemwid({Key? key, required this.item})
      : assert(item != null),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0.9,
      margin: const EdgeInsets.all(5),
      shadowColor: Colors.amber,
      child: ListTile(
        shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
          topLeft: Radius.circular(25),
          topRight: Radius.circular(25),
          bottomRight: Radius.circular(10),
          bottomLeft: Radius.circular(10),
        )),
        contentPadding: const EdgeInsets.all(10),
        horizontalTitleGap: 25,
        // leading: Hero(
        //   tag: item.id,
        //   child: Image.network(
        //     item.,
        //   ),
        // ),
        title: Text(
          item.name,
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: 17,
          ),
        ),
        subtitle: Column(
          children: [
            Text(
              item.address,
              style: const TextStyle(
                  // fontSize: 14,
                  ),
            ),
          ],
        ),
        trailing: Container(
          width: 100,
          height: double.maxFinite,
          child: Text(
            item.speciality,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.red,
            ),
          ),
        ),

        // trailing: Text(
        //   textAlign: ,
        //   item.speciality,
        //   style: const TextStyle(
        //     color: Colors.red,
        //   ),
        // ),
        // onTap: () => Navigator.push(

        //         context,
        //        PageRouteBuilder(
        //         transitionDuration: const Duration(milliseconds: 700),
        //         pageBuilder:(_,__,___) => DetailsPage(items: item),

        //         )),
      ),
    );
  }
}
