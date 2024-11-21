import 'package:flutter/material.dart';
import 'package:sih_2022/screens/community_forum2/newdetails.dart';
import 'package:sih_2022/screens/community_forum2/specially_class.dart';
// ignore: unused_import

class ItemWidget extends StatelessWidget {
  final Item item;
  // ignore: unnecessary_null_comparison
  const ItemWidget({Key? key, required this.item})
      : assert(item != null),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
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
        leading: Hero(
          tag: item.id,
          child: Image.network(
            item.image,
          ),
        ),
        title: Text(
          item.schoolname,
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
            Text(
              item.speciality,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.red,
              ),
            ),
          ],
        ),

        // trailing: Text(
        //   textAlign: ,
        //   item.speciality,
        //   style: const TextStyle(
        //     color: Colors.red,
        //   ),
        // ),

        onTap: () => Navigator.push(
            context,
            PageRouteBuilder(
              transitionDuration: const Duration(milliseconds: 700),
              pageBuilder: (_, __, ___) => DetailsPage(items: item),
            )),
      ),
    );
  }
}
