// ignore_for_file: sort_child_properties_last

import 'package:flutter/material.dart';
import 'package:sih_2022/configs/configs.dart';

enum AnswerStatus { correct, wrong, answered, notanswered }

class AnswerCard extends StatelessWidget {
  const AnswerCard({
    Key? key,
    required this.answer,
    this.isSelected = false,
    required this.onTap,
  }) : super(key: key);

  final String answer;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: UIParameters.cardBorderRadius,
      onTap: onTap,
      child: Ink(
        child: Text(
          answer,
          style: TextStyle(color: isSelected ? Colors.red : null),
        ),
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            color: isSelected ? Colors.green[50] : Theme.of(context).cardColor,
            border: Border.all(color: isSelected ? Colors.pink : Colors.grey)),
      ),
    );
  }
}

class CorrectAnswerCard extends StatelessWidget {
  const CorrectAnswerCard({
    Key? key,
    required this.answer,
  }) : super(key: key);

  final String answer;

  @override
  Widget build(BuildContext context) {
    return Ink(
      child: Text(
        answer,
        style:
            const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      ),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      decoration: BoxDecoration(
        borderRadius: UIParameters.cardBorderRadius,
        color: Colors.green,
      ),
    );
  }
}

class WrongAnswerCard extends StatelessWidget {
  const WrongAnswerCard({
    Key? key,
    required this.answer,
  }) : super(key: key);

  final String answer;

  @override
  Widget build(BuildContext context) {
    return Ink(
      child: Text(
        answer,
        style:
            const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
      ),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      decoration: BoxDecoration(
        borderRadius: UIParameters.cardBorderRadius,
        color: Colors.red,
      ),
    );
  }
}

class NotAnswerCard extends StatelessWidget {
  const NotAnswerCard({
    Key? key,
    required this.answer,
  }) : super(key: key);

  final String answer;

  @override
  Widget build(BuildContext context) {
    return Ink(
      child: Text(
        answer,
        style:
            const TextStyle(color: Colors.yellow, fontWeight: FontWeight.bold),
      ),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 10),
      decoration: BoxDecoration(
        borderRadius: UIParameters.cardBorderRadius,
        color: Colors.orange.withOpacity(0.1),
      ),
    );
  }
}
