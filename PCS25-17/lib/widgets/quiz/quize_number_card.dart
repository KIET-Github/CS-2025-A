// ignore_for_file: no_leading_underscores_for_local_identifiers, sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:sih_2022/configs/configs.dart';
import 'package:sih_2022/widgets/widgets.dart';

class QuizNumberCard extends StatelessWidget {
  const QuizNumberCard({
    Key? key,
    required this.index,
    required this.status,
    required this.onTap,
  }) : super(key: key);

  final int index;
  final AnswerStatus? status;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    Color _backgroundColor = Theme.of(context).primaryColor;

    switch (status) {
      case AnswerStatus.answered:
        _backgroundColor = Colors.amber;
        break;
      case AnswerStatus.correct:
        _backgroundColor = Colors.lightGreen;
        break;
      case AnswerStatus.wrong:
        _backgroundColor = Colors.red;
        break;
      case AnswerStatus.notanswered:
        _backgroundColor = Theme.of(context).primaryColor.withOpacity(0.1);
        break;
      default:
        _backgroundColor = Theme.of(context).primaryColor.withOpacity(0.1);
    }

    return InkWell(
      borderRadius: UIParameters.cardBorderRadius,
      onTap: onTap,
      child: Ink(
        child: Center(
          child: Text(
            '$index',
            style: TextStyle(
                color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
          ),
        ),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
            color: _backgroundColor,
            borderRadius: UIParameters.cardBorderRadius),
      ),
    );
  }
}
