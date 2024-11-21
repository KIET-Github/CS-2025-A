import 'package:flutter/material.dart';

import 'note.dart';
import 'tile.dart';

class Line extends AnimatedWidget {
  final int lineNumber;
  final List<Note> currentNotes;
  final Function(Note) onTileTap;

  Line(
      {required this.currentNotes,
      required this.lineNumber,
      required this.onTileTap,
      required Animation<double> animation})
      : super(listenable: animation);

  @override
  Widget build(BuildContext context) {
    Animation<double> animation = super.listenable as Animation<double>;
    //get heights
    double height = MediaQuery.of(context).size.height;
    double tileHeight = height / 4;

    //get only notes for that line
    List<Note> thisLineNotes =
        currentNotes.where((note) => note.line == lineNumber).toList();

    //map notes to widgets
    List<Widget> tiles = thisLineNotes.map((note) {
      //specify note distance from top
      int index = currentNotes.indexOf(note);
      double offset = (3 - index + animation.value) * tileHeight;

      return Transform.translate(
        offset: Offset(0, offset),
        child: Tile(
          height: tileHeight,
          state: note.state,
          onTap: () => onTileTap(note),
        ),
      );
    }).toList();

    return SizedBox.expand(
      child: Stack(
        children: tiles,
      ),
    );
  }
}
