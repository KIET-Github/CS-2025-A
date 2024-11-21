import 'package:cloud_firestore/cloud_firestore.dart';

class RecentTest {
  final String? correctCount;
  final String? paperId;
  String? papername;
  String? paperimage;
  final double? points;
  final double? time;
  final double? savedtime;

  RecentTest({
    this.correctCount,
    this.paperId,
    this.papername,
    this.paperimage,
    this.time,
    this.points,
    this.savedtime,
  });

  RecentTest.fromSnapshot(QueryDocumentSnapshot<Map<String, dynamic>> snapshot)
      : correctCount = snapshot['correct_count'] as String?,
        paperId = snapshot['paper_id'] as String?,
        papername = '', //snapshot['papername'] as String?,
        paperimage = '', //snapshot['paperimage'] as String?,
        time = snapshot['time'],
        points = snapshot['points'],
        savedtime = snapshot['saved_date'];

  Map<String, dynamic> toJson() => {
        'correct_count': correctCount,
        'paper_id': paperId,
        'papername': papername,
        'paperimage': paperimage,
        'points': points,
        'saved_date': savedtime,
      };
}
