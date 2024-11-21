
class Doctors {
  static List<Products> items = [
    
    Products(
      id: 1,
      address: "Charak Clinics, SCF 30, Phase 3b2,sector 59, Mohali",
      name: "Dr. Gaurav Gupta",
      speciality: "Speciality:DNB (Pediatrics), MBBS ",
    ),
    Products(
      id: 2,
      address: "Nimbus Hospital, Sco 85, sector 86, Mohali",
      name: "Dr.Verinderjit Singh Virdi",
      speciality: "Speciality: MD - Paediatrics",
    ),
    Products(
      id: 3,
      address: "Kalra Child Care & Vaccination Clinic, SCO 6, EXT 8, Shaheed Bhagat Singh Market, Opp. The Knowlegde Bus Global School, Kharar, Punjab",
      name: "Dr.Pancham Kalra",
      speciality: "Speciality: MBBS Bachelor of Medicine ",
    ),
    Products(
      id: 4,
      address: "Child Care Clinic, Chandigarh, Mohali",
      name: "Dr.Prabhjeet Kaur",
      speciality: "Speciality:MBBS, DNB (Pediatrics)",
    ),
    Products(
      id: 5,
      address: "Ravi Mother & Child Clinic, Kharar, Mohali",
      name: "Dr.Mrigind Singh",
      speciality: "Speciality:Fellowship in Neonatology",
    ),
    Products(
      id: 6,
      address: "Cheema Medical Complex Hospital Mohali, S.A.S Nagar, Mohali",
      name: "Dr.Ajaiwant Singh Cheema",
      speciality: "Speciality:MBBS",
    ),
    Products(
      id: 7,
      address: "Fortis Hospital - Mohali, S.A.S Nagar, Mohali",
      name: "Dr.Ashish Dharmik",
      speciality: "Speciality:MBBS, MS - General Surgery, MCh - Paediatric Surgery",
    ),
    Products(
      id: 8,
      address: "Pandove's Family Clinic, Both No. 188, Phase-10, Landmark: Near Sarao Hotel, Mohali, Mohali",
      name: "Dr.Rashmi Pandove",
      speciality: "Speciality:MBBS, MD - Paediatrics",
    ),
    Products(
      id: 9,
      address: "Lilly Health Care, House No 50. Landmark: Opposite Scooter Market, Mohali, Mohali",
      name: "Dr.Nivedita Chhabra",
      speciality: "Speciality:MD - Paediatrics, MBBS",
    ),
    Products(
      id: 10,
      address: "ZIVA KIDS CLINIC, Sco 654, 1st floor, Mohali",
      name: "Dr.Savita Mittal",
      speciality: "Speciality:MBBS Bachelor of Medicine and Surgery-Paediatrics",
    ),
    
  ];
}

class Products {
  final int id;
  final String address;
  final String name;
  final String speciality;


  Products({
    required this.id,
    required this.name,
    required this.address,
    required this.speciality,

  });
}
