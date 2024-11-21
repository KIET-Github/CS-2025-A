// ignore_for_file: prefer_const_constructors, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/screens/quiz/quiz_overview_screen.dart';
import 'package:sih_2022/widgets/widgets.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({
    Key? key,
    this.title = '',
    this.showActionIcon = false,
    this.leading,
    this.titleWidget,
    this.onMenuActionTap,
  }) : super(key: key);

  final String title;
  final Widget? titleWidget;
  final bool showActionIcon;
  final Widget? leading;
  final VoidCallback? onMenuActionTap;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: kMobileScreenPadding,
          ),
          child: Stack(
            children: [
              Positioned.fill(
                child: titleWidget == null
                    ? Center(
                        child: Text(
                        title,
                        style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ))
                    : Center(child: titleWidget!),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  leading ??
                      Transform.translate(
                          offset: const Offset(-14, 0),
                          child:
                              const BackButton()), // transform to allign icons with body content
                  if (showActionIcon)
                    Transform.translate(
                      offset: const Offset(10,
                          0), // transform to allign icons with body content =>  - CircularButton.padding
                      child: CircularButton(
                        child: const Icon(AppIcons.menu),
                        onTap: onMenuActionTap ??
                            () {
                              Get.toNamed(QuizOverviewScreen.routeName);
                            },
                      ),
                    )
                ],
              ),
            ],
          )),
    );
  }

  @override
  Size get preferredSize => const Size(
        double.maxFinite,
        80,
      );
}
