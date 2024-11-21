// ignore_for_file: unnecessary_this, prefer_collection_literals

class AvatarList {
  String? imageUrl = '';

  AvatarList({
    required this.imageUrl,
  });

  AvatarList.fromJson(Map<String, dynamic> json) {
    imageUrl = json['imageUrl'];
  }
  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();

    data['imageUrl'] = this.imageUrl;

    return data;
  }
}
