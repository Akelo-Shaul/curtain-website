// Hero images (root services folder)
import img1 from "../assets/services/1.jpg";
import img2 from "../assets/services/2.jpg";
import img3 from "../assets/services/3.jpg";
import img4 from "../assets/services/4.jpg";

// Custom Curtains subfolder
import cc1 from "../assets/services/custom-curtains/1.jpg";
import cc2 from "../assets/services/custom-curtains/2.jpg";
import cc3 from "../assets/services/custom-curtains/3.jpg";
import cc4 from "../assets/services/custom-curtains/4.jpg";

// Installation subfolder
import inst1 from "../assets/services/installation/1.jpg";
import inst2 from "../assets/services/installation/2.jpg";
import inst3 from "../assets/services/installation/3.jpg";
import inst4 from "../assets/services/installation/4.jpg";

// Consultation subfolder
import cons1 from "../assets/services/consultation/1.jpg";
import cons2 from "../assets/services/consultation/2.jpg";
import cons3 from "../assets/services/consultation/3.jpg";
import cons4 from "../assets/services/consultation/4.jpg";

// Maintenance subfolder
import maint1 from "../assets/services/maintenance/1.jpg";
import maint2 from "../assets/services/maintenance/2.jpg";
import maint3 from "../assets/services/maintenance/3.jpg";
import maint4 from "../assets/services/maintenance/4.jpg";

export const services = {
  "custom-curtains": {
    id: "custom-curtains",
    title: "Custom Curtains",
    description: "Transform your space with our bespoke curtain solutions. Each piece is meticulously crafted to match your unique style and requirements. From fabric selection to final stitching, we ensure every detail reflects elegance and quality. Our custom curtains are designed to perfectly fit your windows, providing both aesthetic appeal and functional benefits like light control and privacy.",
    heroImage: img1,
    features: [
      { label: "Quality Curtains", image: cc1 },
      { label: "Durable", image: cc2 },
      { label: "Aesthetic", image: cc3 },
      { label: "Handcrafted", image: cc4 }
    ]
  },
  "installation": {
    id: "installation",
    title: "Installation",
    description: "Professional installation services that bring your curtains to life. Our expert team handles everything from measuring to mounting, ensuring a flawless finish every time. We use premium hardware and techniques to guarantee your curtains hang perfectly and operate smoothly for years to come. No job is too big or too small for our experienced installers.",
    heroImage: img2,
    features: [
      { label: "Professional Setup", image: inst1 },
      { label: "Precision Fit", image: inst2 },
      { label: "Quick Turnaround", image: inst3 },
      { label: "Clean Finish", image: inst4 }
    ]
  },
  "consultation": {
    id: "consultation",
    title: "Consultation",
    description: "Begin your curtain journey with expert guidance. Our consultation service helps you explore fabric options, design possibilities, and practical solutions tailored to your space. Whether you're redesigning a single room or an entire property, our specialists provide personalized recommendations that align with your vision, budget, and lifestyle needs.",
    heroImage: img3,
    features: [
      { label: "Expert Advice", image: cons1 },
      { label: "Design Options", image: cons2 },
      { label: "Color Matching", image: cons3 },
      { label: "Budget Planning", image: cons4 }
    ]
  },
  "maintenance": {
    id: "maintenance",
    title: "Maintenance",
    description: "Keep your curtains looking pristine with our comprehensive maintenance services. From professional cleaning to repairs and alterations, we extend the life and beauty of your window treatments. Regular maintenance not only preserves appearance but also ensures optimal functionality, protecting your investment for the long term.",
    heroImage: img4,
    features: [
      { label: "Deep Cleaning", image: maint1 },
      { label: "Repairs", image: maint2 },
      { label: "Alterations", image: maint3 },
      { label: "Care Tips", image: maint4 }
    ]
  }
};
