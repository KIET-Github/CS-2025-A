// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class SpeciallyAbled {
  static List<Item> items = [
    Item(
      id: 1,
      location: "Block C, Sushant Lok III, Sector 57, Gurgaon 122 003",
      contact:
          "0124-4903700/701, 2571015/016",
      email: "info@thehdfcschool.com",
      address: "Gurgaon (Gurugram),Haryana",
      schoolname: "The HDFC School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/red-brick-high-school-building-exterior-picture-id171306436?s=612x612",
    ),
    Item(
      id: 2,
      location:
          "Sector 29, Near Rajiv Gandhi Park, Vashi, Navi Mumbai India",
      contact: "91 22 32985250/51, 27882271/72",
      email: "info@goldcrestinternational.in",
      address: "Navi Mumbai,Maharashtra",
      schoolname: "Goldcrest International School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/brick-school-building-with-columns-and-flowers-arrangement-picture-id184928777?k=20&m=184928777&s=612x612&w=0&h=UwgqcycscfJmsGXv0pT3FQgNxfUSNBY-9ARZPLAUOqo=",
    ),
    Item(
      id: 3,
      location:
          "994, Madurdaha, - Chowbaga Road, Anandpur - P.O. East Kolkata Township Kolkata - West Bengal - 700107 - INDIA",
      contact: "033-2443 0448, 033-2443 0452",
      email: "info@theheritageschool.org",
      address: "Kolkata,West Bengal",
      schoolname: "The Heritage School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/high-school-picture-id174621695?k=20&m=174621695&s=612x612&w=0&h=6DiGMrY73uTEncxVx2Uso0CWcBSPpdlC9wspkSSwNoo=",
    ),
    Item(
      id: 4,
      location: "Kolkata,West Bengal",
      contact: "+91935548995",
      email: "calculattaschool@gmail.com",
      address: "Kolkata,West Bengal",
      schoolname: "Calcutta International School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/path-to-high-school-building-exterior-picture-id154962736?k=20&m=154962736&s=612x612&w=0&h=mGWbN8JrdrV7SnyeCxRvdAyi7X1iBiSbusgu46yPatw=",
    ),
    Item(
      id: 5,
      location: "724, Anandapur - Beside E M Bypass Kolkata - 700107 INDIA",
      contact: "033 2443 2054",
      email: "www.calcuttais.edu.in/",
      address: "Gurgaon (Gurugram),Haryana",
      schoolname: "Scottish High International School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY2Zn56Q6hduJviA8oGKLuPWacF6pns_NDg&usqp=CAU",
    ),
    Item(
      location:
          "Step by Step School, Plot-A 10 - Sector-132, Taj Expressway - Noida, Uttar Pradesh - 201303 - INDIA",
      contact: "0120 3857300",
      email: "info@sbs-school.org",
      id: 6,
      address: "Noida",
      schoolname: "Step by Step School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/british-secondary-school-picture-id1363289778?k=20&m=1363289778&s=612x612&w=0&h=l97eWlpPzrCiRUWPVWsYbty1P7qUYjVFM4Dc2ZxyCsM=",
    ),
    Item(
      id: 7,
      location: "D-6 street Vasant Vihar, New Delhi 110057",
      contact: "011 26151572",
      email: "info@tamana.org",
      address: "Vasant Vihar, Delhi",
      schoolname: "Tamana Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/high-school-picture-id174621695?k=20&m=174621695&s=612x612&w=0&h=6DiGMrY73uTEncxVx2Uso0CWcBSPpdlC9wspkSSwNoo=",
    ),
    Item(
      id: 8,
      location:
          "No.3 3rd Street, Dr. Radhakrishnan Salai,Mylapore, Chennai – 600 004.",
      contact: "044-2847 5422",
      email: "clarkskn@md2.vsnl.net.in",
      address: "Mylapore, Chennai",
      schoolname: "Clarke School for the Deaf Blind",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/education-front-of-elementary-school-building-empty-no-people-rotunda-picture-id157286111?k=20&m=157286111&s=612x612&w=0&h=EkrylAD3oBwSbqNHfIqm_S4bj1Obb3kn3AePEIso5zM=",
    ),
    Item(
      id: 9,
      location: "Saraogarh road, Sular(Patiala), Punjab 147001",
      contact: "0-794720991",
      email: "clarkskn@md2.vsnl.net.in",
      address: " Hyderabad,Telangana",
      schoolname: "Creative Minds Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/high-school-gymnasium-picture-id521720798?k=20&m=521720798&s=612x612&w=0&h=lMxwnONzbfQg9Z9V7CiJw0-fDZhycvyONH855MgVzxk=",
    ),
    Item(
      id: 10,
      location:
          "Saifdipur, Urban Estate, Patiala - 147002, Behind Punjabi University",
      contact: "0175 221 3517",
      email: "navjivinischool@yahoo.com",
      address: "Sular(Patiala), Punjab ",
      schoolname: "Navjivini Institute of Special Education",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/empty-japanese-classroom-picture-id488557342?k=20&m=488557342&s=612x612&w=0&h=KCAeh0sXNfGoowLVI7e3KmF1RKyngXoDAig-bIhv47o=",
    ),
    Item(
      id: 11,
      location: "JVHP+VWF, Tehsilpura, G.T Road., Amritsar, Punjab",
      contact: "0175 221 3517",
      email: "patialaschoolefordeaf@gmail.com",
      address: "Patiala,Punjab",
      schoolname: "Patiala School for Deaf and Blind",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/salisbury-school-at-salisbury-in-connecticut-picture-id1277715078?k=20&m=1277715078&s=612x612&w=0&h=Xhh469uEoObNfsq4xJoBGRVdDsIyY857MEi1pfoLVC0=",
    ),
    Item(
      id: 12,
      location:
          "Sant Avenue Near Radha Swami Satsang Bhawan, The Mall 7-C, Near T.B.GOVT .HOSPITAL, Sant Ave, Kashmir Avenue, Amritsar, Punjab",
      contact: "98885 17238",
      email: "info@patialaschool.org",
      address: " Amritsar, Punjab",
      schoolname: "DAV Red Cross School for special children",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/high-school-picture-id174621695?k=20&m=174621695&s=612x612&w=0&h=6DiGMrY73uTEncxVx2Uso0CWcBSPpdlC9wspkSSwNoo=",
    ),
    Item(
      id: 13,
      location: "81 lane no 17, New Pawan Nagar, Amritsar, Punjab",
      contact: "89685 79676",
      email: "learningheights2015@gmail.com",
      address: "Amritsar, Punjab",
      schoolname: "Ibadat Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY2Zn56Q6hduJviA8oGKLuPWacF6pns_NDg&usqp=CAU",
    ),
    Item(
      id: 14,
      location:
          "Raja Sansi Rd, opp. Lakshmi bikaner, Sahibzada Jujhar Singh Avenue, Gumtala, Amritsar, Punjab",
      contact: "89685 79676",
      email: "nayeedisha@gmail.com",
      address: " Amritsar, Punjab",
      schoolname: "Nayee Disha , education for special children",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/morning-light-on-east-facade-sandford-park-school-dublin-ireland-picture-id1288680475?k=20&m=1288680475&s=612x612&w=0&h=85WpzDgRrR4mjtXzdWNwnZiZkbYgBbmMIK88zZMvcPs=",
    ),
    Item(
      id: 15,
      location:
          "Plot No 9  Dwarka, New Delhi",
      contact: "096549 09004",
      email: "calmsmind@gmail.com",
      address: "Amritsar, Punjab",
      schoolname: "CalmMinds Sensory Play Gym for Special children",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/brick-school-building-with-columns-and-flowers-arrangement-picture-id184928777?k=20&m=184928777&s=612x612&w=0&h=UwgqcycscfJmsGXv0pT3FQgNxfUSNBY-9ARZPLAUOqo=",
    ),
    Item(
      id: 16,
      location:
          "Plot No 9 , second Floor of G mega mart, Sector 12A Rd, opposite to CNG station, Dwarka, New Delhi",
      contact: "098103 74238",
      email: "newlearning323@gmail.com",
      address: "Dwarka, New Delhi",
      schoolname: "The New Learning Heights Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY2Zn56Q6hduJviA8oGKLuPWacF6pns_NDg&usqp=CAU",
    ),
    Item(
      id: 17,
      location:
          "B-270, 2nd Main Rd, Derawal Nagar, Gujranwala Town, New Delhi, Delhi 110009",
      contact: "098103 74238",
      email: "abhyaas@gmail.com",
      address: "Gujranwala Town, New Delhi",
      schoolname: "Abhyaas Special Centre For Special Children",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/central-high-school-exterior-picture-id635744526?k=20&m=635744526&s=612x612&w=0&h=WVoQ_tA0i06flEDN4-EoGObEeWPyAwiaig3FUJ4PZdA=",
    ),
    Item(
      id: 18,
      location:
          "Metro Pillar No 60, Plot No, 15-16, Ranaji Enclave Ph-2, near Nangli Metro Station, Najafgarh, Delhi",
      contact: "098100 52701",
      email: "delhispecialschool@gmail.com",
      address: "Najafgarh, Delhi",
      schoolname: "Delhi Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/dkrefeld-rhine-lower-rhine-rhineland-north-rhinewestphalia-nrw-at-picture-id549528007?k=20&m=549528007&s=612x612&w=0&h=Q9MO0QEAIZ9ON7UYUpYOinTpxBuYcUgyjC1UQYzlZXs=",
    ),
    Item(
      id: 19,
      location: "Opp. Times of India, Ashram road, Ahmedabad 380009, Gujarat.",
      contact: "97181 91212",
      email: "dms@deafmuteschool.com",
      address: "Ahmedabad,Gujarat",
      schoolname: "School For Deaf Mute",
      speciality: "Speciality:Deaf Kids",
      image:
          "https://media.gettyimages.com/photos/empty-japanese-classroom-picture-id488557342?k=20&m=488557342&s=612x612&w=0&h=KCAeh0sXNfGoowLVI7e3KmF1RKyngXoDAig-bIhv47o=",
    ),
    Item(
      id: 20,
      location: "Ward-08, Raopura, Karelibaug, Vadodara",
      contact: "079 26586138, 26579947",
      email: "kamlaben23@gmail.com",
      address: "Vadodara,Gujarat",
      schoolname: "SMT.Kamlaben Badhir Vidyalya",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/british-secondary-school-picture-id1363289778?k=20&m=1363289778&s=612x612&w=0&h=l97eWlpPzrCiRUWPVWsYbty1P7qUYjVFM4Dc2ZxyCsM=",
    ),
    Item(
      id: 21,
      location: "Nr. Muni. Coomi. Banglows, Athwaline, Ambhikaniketan, Surat",
      contact: "98883-34053",
      email: "mookbadhir32@gmail.com",
      address: "Surat,Gujarat",
      schoolname: "Mook Badhir Vikas Trust Sanchalit",
      speciality: "Speciality:Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/exterior-of-high-school-on-a-sunny-day-picture-id1240005158?k=20&m=1240005158&s=612x612&w=0&h=EBfedLJvQ5f9z_koyiIJZ5mSuvkbzegVTTJV0KSVPKI=",
    ),
    Item(
      id: 22,
      location:
          "423/424,Kakrola Housing Complex Dwarka Mor, Najafgarh Rd, New Delhi,",
      contact: "99909 78499",
      email: "holyheartspecial@gmail.com",
      address: "New Delhi,",
      schoolname: "Holy Heart Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/quandrangle-lawn-at-the-university-of-washington-picture-id157505397?k=20&m=157505397&s=612x612&w=0&h=57bMmpEO8TgHKBPHMZA-3t0sZj4gimEQWytC_AfrS8c=",
    ),
    Item(
      id: 23,
      location:
          "PLOT NO 111, Brahma Shakti Special School, Old Palam Rd, Shivani Enclave, Sector 15 Dwarka, Kakrola, New Delhi",
      contact: "85860 03232",
      email: "brahmashakti@ektashakti.org",
      address: "Kakrola, New Delhi",
      schoolname: "Brahma Shakti Special School",
      speciality: "Speciality:Deaf and Dumb Kids",
      image:
          "https://media.gettyimages.com/photos/students-walk-along-covered-footpath-at-stanford-university-picture-id459398825?k=20&m=459398825&s=612x612&w=0&h=hnH-MQfgLkITxSNqqd_BXdlwL3_r77t1CJfyTkuYWng=",
    ),
    Item(
        id: 24,
        location:
            "RZ-F-2, Palam - Dabri Marg, behind Vijay Enclave, Tamilar Enclave, Dwarka, New Delhi",
        contact: "99713 48622",
        email: "vedspecialschool23@gmail.com",
        address: " Dwarka, New Delhi",
        schoolname: "Ved Special School",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/modern-institution-building-picture-id182146134?k=20&m=182146134&s=612x612&w=0&h=aE7ezFCk8GTLMOaV4avvh91YGAq3_dWqyGNH7MKJLdw="),
    Item(
        id: 25,
        location: "1177, Phase 1, Urban Estate, Jalandhar",
        contact: "7986246968",
        email: "trident@gmail.com",
        address: "Jalandhar,Punjab",
        schoolname: "Trident Academy- Special School",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY2Zn56Q6hduJviA8oGKLuPWacF6pns_NDg&usqp=CAU"),
    Item(
        id: 26,
        location: "952, near Telephone Exchange, J.P. Nagar, Jalandhar,",
        contact: "8605433000",
        email: "udaan@gmail.com",
        address: "Jalandhar,Punjab",
        schoolname: "Udaan Special School",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/education-front-of-elementary-school-building-empty-no-people-rotunda-picture-id157286111?k=20&m=157286111&s=612x612&w=0&h=EkrylAD3oBwSbqNHfIqm_S4bj1Obb3kn3AePEIso5zM="),
    Item(
        id: 27,
        location: "K-Villa, Thane (West) – 400 601",
        contact: "98883-34053",
        email: "hcschool.thane@gmail.com",
        address: "Thane,Maharashtra",
        schoolname:
            "Holy Cross Convent Special School and Career training Centre",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/turkish-students-walking-to-school-istanbul-picture-id533242437?k=20&m=533242437&s=612x612&w=0&h=INA5pOPV0j9wsBM7mEtaDaE-OyBQ0rFZKvFFG07woWk="),
    Item(
        id: 28,
        location:
            "No. 160, Dadasaheb Phalke Road, Dadar East, Mumbai - 400014, Opposite Hindmata Cinema, Near Tata Mills",
        contact: "+91548784612",
        email: "muskan@gmail.com",
        address: "Mumbai,Maharashtra",
        schoolname: "Muskan Foundation",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY2Zn56Q6hduJviA8oGKLuPWacF6pns_NDg&usqp=CAU"),
    Item(
        id: 29,
        location:
            "No. 160, Dadasaheb Phalke Road, Dadar East, Mumbai - 400014, Opposite Hindmata Cinema, Near Tata Mills ",
        contact: "0-7947182658",
        email: "kamlamehta@gmail.com",
        address: "Mumbai,Maharashtra",
        schoolname: "Smt Kamla Mehta School For The Blind",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/high-school-gymnasium-picture-id521720798?k=20&m=521720798&s=612x612&w=0&h=lMxwnONzbfQg9Z9V7CiJw0-fDZhycvyONH855MgVzxk="),
    Item(
        id: 30,
        location:
            "564, J R Ghosh Garden, P.O. Laskarpur, Garia, Mahamayatala, Kolkata",
        contact: "022-26397235, 91-22- 2539 7235",
        email: "mother3423@gmail.com",
        address: "Kolkata,West Bengal",
        schoolname: "Mother and Child School",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/students-walk-along-covered-footpath-at-stanford-university-picture-id459398825?k=20&m=459398825&s=612x612&w=0&h=hnH-MQfgLkITxSNqqd_BXdlwL3_r77t1CJfyTkuYWng="),
    Item(
        id: 31,
        location:
            "33A/1, Canal South Road, Kolkata 700015 Kolkata, West Bengal, India 700015",
        contact: "91 970213113",
        email: "pradip_autism@yahoo.com",
        address: "Kokata,West Bengal",
        schoolname: "Pradip: Centre for Autism Management",
        speciality: "Autism",
        image:
            "https://media.gettyimages.com/photos/quandrangle-lawn-at-the-university-of-washington-picture-id157505397?k=20&m=157505397&s=612x612&w=0&h=57bMmpEO8TgHKBPHMZA-3t0sZj4gimEQWytC_AfrS8c="),
    Item(
        id: 32,
        location: "Laskarpur,Garia, Mahamayatala, Kolkata",
        contact: "98300 28888",
        email: "abhay@motherandchildschool.com",
        address: "Kokata,West Bengal",
        schoolname: "Indian Mother and Child Care",
        speciality: "Speciality:Deaf and Dumb Kids",
        image:
            "https://media.gettyimages.com/photos/path-to-high-school-building-exterior-picture-id154962736?k=20&m=154962736&s=612x612&w=0&h=mGWbN8JrdrV7SnyeCxRvdAyi7X1iBiSbusgu46yPatw="),
  ];
}

class Item {
  final int id;
  final String location;
  final String contact;
  final String email;
  final String address;
  final String schoolname;
  final String speciality;
  final String image;

  Item({
    required this.id,
    required this.schoolname,
    required this.location,
    required this.contact,
    required this.email,
    required this.address,
    required this.speciality,
    required this.image,
  });

  Item copyWith({
    int? id,
    String? schoolname,
    String? location,
    String? contact,
    String? email,
    String? address,
    String? speciality,
    String? image,
  }) {
    return Item(
      id: id ?? this.id,
      schoolname: schoolname ?? this.schoolname,
      location: location ?? this.location,
      contact: contact ?? this.contact,
      email: email ?? this.email,
      address: address ?? this.address,
      speciality: speciality ?? this.speciality,
      image: image ?? this.image,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'schoolname': schoolname,
      'location': location,
      'contact': contact,
      'email': email,
      'address': address,
      'speciality': speciality,
      'image': image,
    };
  }

  factory Item.fromMap(Map<String, dynamic> map) {
    return Item(
      id: map['id']?.toInt() ?? 0,
      schoolname: map['schoolname'] ?? '',
      location: map['location'] ?? '',
      contact: map['contact'] ?? '',
      email: map['email'] ?? '',
      address: map['address'] ?? '',
      speciality: map['speciality'] ?? '',
      image: map['image'] ?? '',
    );
  }

  String toJson() => json.encode(toMap());

  factory Item.fromJson(String source) => Item.fromMap(json.decode(source));

  @override
  String toString() {
    return 'Item(id: $id, schoolname: $schoolname, location: $location, contact: $contact, email: $email, address: $address, speciality: $speciality, image: $image)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Item &&
        other.id == id &&
        other.schoolname == schoolname &&
        other.location == location &&
        other.contact == contact &&
        other.email == email &&
        other.address == address &&
        other.speciality == speciality &&
        other.image == image;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        schoolname.hashCode ^
        location.hashCode ^
        contact.hashCode ^
        email.hashCode ^
        address.hashCode ^
        speciality.hashCode ^
        image.hashCode;
  }
}
