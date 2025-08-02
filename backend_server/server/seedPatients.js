const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('./models/Patient');

dotenv.config();

const samplePatients = [
    {
        name: "Sarah Ahmed",
        email: "sarah.ahmed@example.com",
        profilePic: "",
        gender: "female",
        dateOfBirth: new Date("1990-05-15"),
        address: {
            country: "Egypt",
            city: "Cairo",
            zip: "11311",
            street: "12 Nile St"
        },
        phone: "01001234567",
        medicalHistory: {
            allergies: ["Penicillin"],
            medications: ["Ibuprofen"],
            conditions: ["asthma"],
            notes: "Patient uses inhaler occasionally."
        },
        dentalChart: {
            teeth: {
                "11": { condition: "filled", notes: "Composite filling" },
                "24": { condition: "decayed", notes: "Needs restoration" }
            }
        }
    },
    {
        name: "Mohamed Ali",
        email: "mohamed.ali@example.com",
        profilePic: "",
        gender: "male",
        dateOfBirth: new Date("1985-10-22"),
        address: {
            country: "Egypt",
            city: "Giza",
            zip: "12511",
            street: "5 Pyramids Rd"
        },
        phone: "01009876543",
        medicalHistory: {
            allergies: [],
            medications: [],
            conditions: ["diabetes"],
            notes: "Type 2 diabetes, controlled with diet."
        },
        dentalChart: {
            teeth: {
                "16": { condition: "healthy", notes: "" },
                "36": { condition: "missing", notes: "Extracted 2022" }
            }
        }
    },
    {
        name: "Mona Hassan",
        email: "mona.hassan@example.com",
        profilePic: "",
        gender: "female",
        dateOfBirth: new Date("1992-03-10"),
        address: {
            country: "Egypt",
            city: "Alexandria",
            zip: "21532",
            street: "8 Corniche Rd"
        },
        phone: "01002345678",
        medicalHistory: {
            allergies: ["Aspirin"],
            medications: [],
            conditions: [],
            notes: ""
        },
        dentalChart: {
            teeth: {
                "21": { condition: "crowned", notes: "Porcelain crown" },
                "46": { condition: "decayed", notes: "Needs root canal" }
            }
        }
    },
    {
        name: "Youssef Samir",
        email: "youssef.samir@example.com",
        profilePic: "",
        gender: "male",
        dateOfBirth: new Date("1978-12-05"),
        address: {
            country: "Egypt",
            city: "Mansoura",
            zip: "35511",
            street: "22 Tahrir St"
        },
        phone: "01003456789",
        medicalHistory: {
            allergies: [],
            medications: ["Metformin"],
            conditions: ["hypertension"],
            notes: "Blood pressure monitored regularly."
        },
        dentalChart: {
            teeth: {
                "12": { condition: "healthy", notes: "" },
                "26": { condition: "filled", notes: "Amalgam filling" }
            }
        }
    },
    {
        name: "Layla Mostafa",
        email: "layla.mostafa@example.com",
        profilePic: "",
        gender: "female",
        dateOfBirth: new Date("2000-07-19"),
        address: {
            country: "Egypt",
            city: "Tanta",
            zip: "31511",
            street: "3 Station St"
        },
        phone: "01004567890",
        medicalHistory: {
            allergies: [],
            medications: [],
            conditions: [],
            notes: "No significant medical history."
        },
        dentalChart: {
            teeth: {
                "31": { condition: "healthy", notes: "" },
                "41": { condition: "decayed", notes: "Caries detected" }
            }
        }
    },
    // Additional sample patients
    {
        name: "Omar Khaled",
        email: "omar.khaled@example.com",
        profilePic: "",
        gender: "male",
        dateOfBirth: new Date("1995-09-12"),
        address: {
            country: "Egypt",
            city: "Aswan",
            zip: "81511",
            street: "7 Lotus St"
        },
        phone: "01005678901",
        medicalHistory: {
            allergies: ["Latex"],
            medications: [],
            conditions: [],
            notes: "Allergic to latex gloves."
        },
        dentalChart: {
            teeth: {
                "15": { condition: "decayed", notes: "Needs filling" },
                "25": { condition: "healthy", notes: "" }
            }
        }
    },
    {
        name: "Hana Magdy",
        email: "hana.magdy@example.com",
        profilePic: "",
        gender: "female",
        dateOfBirth: new Date("1988-11-30"),
        address: {
            country: "Egypt",
            city: "Suez",
            zip: "43511",
            street: "10 Canal St"
        },
        phone: "01006789012",
        medicalHistory: {
            allergies: [],
            medications: ["Lisinopril"],
            conditions: ["hypertension"],
            notes: "Recently started medication."
        },
        dentalChart: {
            teeth: {
                "13": { condition: "filled", notes: "Composite" },
                "23": { condition: "crowned", notes: "Metal-ceramic" }
            }
        }
    },
    {
        name: "Karim Fathy",
        email: "karim.fathy@example.com",
        profilePic: "",
        gender: "male",
        dateOfBirth: new Date("1982-04-18"),
        address: {
            country: "Egypt",
            city: "Zagazig",
            zip: "44519",
            street: "15 University St"
        },
        phone: "01007890123",
        medicalHistory: {
            allergies: ["Sulfa drugs"],
            medications: [],
            conditions: ["asthma"],
            notes: "Carries inhaler."
        },
        dentalChart: {
            teeth: {
                "32": { condition: "decayed", notes: "Deep caries" },
                "42": { condition: "healthy", notes: "" }
            }
        }
    },
    {
        name: "Nour El-Din",
        email: "nour.eldin@example.com",
        profilePic: "",
        gender: "male",
        dateOfBirth: new Date("2001-01-25"),
        address: {
            country: "Egypt",
            city: "Fayoum",
            zip: "63511",
            street: "2 Lake Rd"
        },
        phone: "01008901234",
        medicalHistory: {
            allergies: [],
            medications: [],
            conditions: [],
            notes: "No known issues."
        },
        dentalChart: {
            teeth: {
                "14": { condition: "healthy", notes: "" },
                "44": { condition: "filled", notes: "Glass ionomer" }
            }
        }
    },
    {
        name: "Fatma Adel",
        email: "fatma.adel@example.com",
        profilePic: "",
        gender: "female",
        dateOfBirth: new Date("1975-06-02"),
        address: {
            country: "Egypt",
            city: "Ismailia",
            zip: "41511",
            street: "18 Freedom St"
        },
        phone: "01009012345",
        medicalHistory: {
            allergies: ["Penicillin"],
            medications: ["Amlodipine"],
            conditions: ["hypertension"],
            notes: "Blood pressure under control."
        },
        dentalChart: {
            teeth: {
                "22": { condition: "crowned", notes: "Zirconia" },
                "47": { condition: "decayed", notes: "Needs extraction" }
            }
        }
    },
    
];

const Appointment = require('./models/Appointment');
const Payment = require('./models/Payment');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear old data
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Payment.deleteMany({});

    // Insert patients
    const insertedPatients = await Patient.insertMany(samplePatients);
    console.log('Sample patients inserted!');

    // Use patient _ids for related appointments and payments
    const appointments = insertedPatients.map((patient, index) => ({
      date: new Date(Date.now() + index * 86400000), // Spread out by 1 day
      status: index % 2 === 0 ? 'scheduled' : 'completed',
      patient: patient._id,
    }));

    const payments = insertedPatients.map((patient, index) => ({
      amount: 200 + index * 50,
      status: index % 2 === 0 ? 'paid' : 'unpaid',
      patient: patient._id,
    }));

    await Appointment.insertMany(appointments);
    await Payment.insertMany(payments);
    console.log('Appointments and payments inserted!');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


seed();