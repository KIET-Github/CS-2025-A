import 'package:flutter/material.dart';
import 'package:sih_2022/configs/configs.dart';

class ContentArea extends StatelessWidget {
  const ContentArea({
    Key? key,
    required this.child,
    this.addPadding = true,
    this.decor = const BoxDecoration(),
  }) : super(key: key);
  final BoxDecoration decor;
  final Widget child;
  final bool addPadding;

  @override
  Widget build(BuildContext context) {
    return Material(
      // borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      clipBehavior: Clip.hardEdge,
      type: MaterialType.transparency,
      child: Ink(
        decoration: decor,
        padding: addPadding
            ? const EdgeInsets.only(
                top: kMobileScreenPadding,
                left: kMobileScreenPadding,
                right: kMobileScreenPadding)
            : EdgeInsets.zero,
        child: child,
      ),
    );
  }
}
