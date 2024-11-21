// // ignore_for_file: unnecessary_this, prefer_collection_literals, unnecessary_new

// class TimeLineList {
//   String? images = '';
//   String? id = '';
//   String? ques = '';
//   String? q1 = '';
//   String q2 = '';
//   String q3 = "";
//   String views = '';
//   String likes = '';
//   String ans = '';
//   String avatar = '';

//   TimeLineList({
//     required this.images,
//     required this.id,
//     required this.ques,
//     required this.q1,
//     required this.q2,
//     q3,
//     required this.views,
//     required this.likes,
//     required this.ans,
//     required this.avatar,
//   });

//   TimeLineList.fromJson(Map<String, dynamic> json) {
//     images = json['images'];
//     id = json['id'];
//     ques = json['ques'];
//     q1 = json['q1'];
//     q2 = json['q2'];
//     q3 = json['q3'];
//     views = json['views'];
//     likes = json['likes'];
//     ans = json['ans'];
//     avatar = json['avatar'];

//     avatar = json['avatars'];
//   }
//   Map<String, dynamic> toJson() {
//     final Map<String, dynamic> data = new Map<String, dynamic>();
//     data['images'] = this.images;
//     data['id'] = this.id;
//     data['ques'] = this.ques;
//     data['q1'] = this.q1;
//     data['q2'] = this.q2;
//     data['q3'] = this.q3;
//     data['views'] = this.views;
//     data['likes'] = this.likes;
//     data['ans'] = this.ans;
//     data['avatars'] = this.avatar;

//     return data;
//   }
// }
