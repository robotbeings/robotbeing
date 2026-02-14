import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const pageContent = {
    // Products (Non-Hardware)
    'orbit': {
        title: 'Orbit Fleet Management',
        subtitle: 'Unified fleet management for your robot workforce.',
        image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f970?auto=format&fit=crop&w=1200&q=80',
        content: 'Orbit provides a single pane of glass to manage The Robot and Logistics Robot fleets. Schedule missions, collect data, and analyze results from anywhere in the world.',
        itemsTitle: 'Orbit Features',
        items: [],
        sections: [
            {
                title: 'Software Capabilities',
                items: [
                    { title: 'Remote Ops', desc: 'Securely teleoperate robots from across the globe via web interface.' },
                    { title: 'Auto-Scheduling', desc: 'Set routine inspection rounds based on site activity or time.' },
                    { title: 'Fleet Health', desc: 'Continuous monitoring of battery, sensors, and hardware status.' }
                ]
            }
        ]
    },

    // Solutions
    'inspection': {
        title: 'Inspection & Monitoring',
        subtitle: 'Automated sensing for asset health.',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        content: 'The Robot carries thermal cameras, acoustic imagers, and lidars to perform routine inspections autonomously, detecting anomalies before they become failures.',
        itemsTitle: 'Inspection Payloads',
        items: [],
        sections: [
            {
                title: 'Inspection Utility',
                items: [
                    { title: 'Predictive Maintenance', desc: 'Catch overheating components before they cause a shutdown.' },
                    { title: 'Site Digitization', desc: 'Regularly capture 3D data to maintain a current digital twin.' },
                    { title: 'Remote Access', desc: 'Access hard-to-reach or dangerous areas without human exposure.' }
                ]
            }
        ]
    },
    'safety-response': {
        title: 'Safety & Emergency Response',
        subtitle: 'Keep people out of harm\'s way.',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
        content: 'Deploy robots to dangerous environments like chemical spills, fires, or radiation zones to assess the situation while keeping human responders at a safe distance.',
        itemsTitle: 'Responder Units',
        items: [
            {
                name: 'Hazmat-The Robot',
                image: 'https://images.unsplash.com/photo-1561557944-6eda7a488ba8?auto=format&fit=crop&w=400&q=80',
                specs: ['Radiation Sensor', 'Gas Detection', 'IP68 Submersible'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'Search & Rescue Eye',
                image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
                specs: ['Obstacle AI', 'Night Vision Pro', '2km Link'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Critical Capabilities',
                items: [
                    { title: 'Hazard Mapping', desc: 'Real-time thermal and gas maps for first responders.' },
                    { title: 'Communication Bridge', desc: 'Establish comms in tunnel or bunker collapse scenarios.' },
                    { title: 'Delivery & Retrieval', desc: 'Carry medical supplies or critical parts into toxic zones.' }
                ]
            }
        ]
    },
    'research': {
        title: 'Research & Innovation',
        subtitle: 'Pushing the boundaries of what is possible.',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=1200&q=80',
        content: 'Our platforms are the gold standard for robotics research. From universities to corporate R&D labs, The Robot and Advanced Humanoid are helping invent the future.',
        itemsTitle: 'Research Platforms',
        items: [
            {
                name: 'The Robot SDK Explorer',
                image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=400&q=80',
                specs: ['Full API Access', 'Mounting Rails', 'Compute Payload'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'Advanced Humanoid Advanced R&D',
                image: 'https://images.unsplash.com/photo-1533234458044-95c8d7621c10?auto=format&fit=crop&w=400&q=80',
                specs: ['Whole-body Control', 'Dynamic Locomotion', 'Private Alpha'],
                cta: 'CONTACT FOR DETAILS'
            }
        ]
    },

    // Industries
    'manufacturing': {
        title: 'Manufacturing Automation',
        subtitle: 'Optimization and reliability for the factory floor.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        content: 'Our robots navigate unstructured environments to automate inspection, remote operation, and material handling tasks, keeping your team safe and your operations running smoothly.',
        itemsTitle: 'Factory Fleet',
        items: [
            {
                name: 'Logistics Robot Logistics Unit',
                image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=400&q=80',
                specs: ['23kg Payload', '800 Cases/Hour', 'Mobile Base'],
                cta: 'VIEW SPECS'
            },
            {
                name: 'The Robot Industry Mod',
                image: 'https://images.unsplash.com/photo-1563968743333-044cef800494?auto=format&fit=crop&w=400&q=80',
                specs: ['360° LiDAR', 'IP67 Rated', 'Hazard Detection'],
                cta: 'INQUIRE'
            }
        ],
        sections: [
            {
                title: 'Manufacturing Benefits',
                items: [
                    { title: 'Labor Gap Coverage', desc: 'Automate repetitive tasks that are hard to staff.' },
                    { title: 'Increased Safety', desc: 'Deploy robots to hazardous zones or high-traffic areas.' },
                    { title: 'Predictive ROI', desc: 'Consistent performance metrics for plant optimization.' }
                ]
            }
        ]
    },
    'energy-natural-resources': {
        title: 'Energy & Natural Resources',
        subtitle: 'Safer operations in hazardous environments.',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        content: 'From offshore rigs to remote substations, our robots perform autonomous inspections and gauge readings, reducing the need for human presence in dangerous areas.',
        itemsTitle: 'Rugged Specialized Hardware',
        items: [
            {
                name: 'Offshore-The Robot (Corrosion Spec)',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
                specs: ['Salt-Spray Rated', 'Thermal Eye AI', 'LTE Comms'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'ATEX-Certified Scout',
                image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
                specs: ['Explosion-Proof', 'Methane Sensing', 'Autonomous Patrol'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Energy Sector Applications',
                items: [
                    { title: 'Remote Inspection', desc: 'Read gauges and inspect valves from the control room.' },
                    { title: 'Emergency Response', desc: 'Initial assessment of leaks or fires before sending humans.' },
                    { title: 'Site Security', desc: '24/7 autonomous patrol of critical infrastructure perimeters.' }
                ]
            }
        ]
    },
    'logistics': {
        title: 'Warehouse & Logistics',
        subtitle: 'Streamlined box moving and case handling.',
        image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&w=1200&q=80',
        content: 'Automate the dull, dirty, and dangerous tasks in your warehouse. Logistics Robot handles cases up to 50lbs, improving throughput and reducing injury risks.',
        itemsTitle: 'Logistics Hardware',
        items: [
            {
                name: 'Logistics Robot Warehouse Bot',
                image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=400&q=80',
                specs: ['50lb Lift Cap', 'Full Reach Arm', 'Smart Vision AI'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'Sort-Bot Mobile',
                image: 'https://images.unsplash.com/photo-1535378801407-e4359005934a?auto=format&fit=crop&w=400&q=80',
                specs: ['Parcel Sorting', 'Mesh Fleet AI', '12hr Battery'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Operational Excellence',
                items: [
                    { title: 'Unloading Automation', desc: 'Empty trailers and containers faster with autonomous systems.' },
                    { title: 'Palletizing', desc: 'Intelligent case stacking for optimized transport.' },
                    { title: 'Inventory Scan', desc: 'Rapid, accurate stock counting via mobile platforms.' }
                ]
            }
        ]
    },
    'construction': {
        title: 'Construction & Digital Twin',
        subtitle: 'Automated data capture for job sites.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f3366d4?auto=format&fit=crop&w=1200&q=80',
        content: 'Create digital twins and track progress with autonomous scanning. Our robots walk the site so you don\'t have to, providing consistent, high-quality data.',
        itemsTitle: 'Site Sensing Hardware',
        items: [
            {
                name: 'Site-Link The Robot',
                image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=400&q=80',
                specs: ['BIM Integration', 'Site-Walk AI', 'Cloud Sync'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'Scanner Pro Head',
                image: 'https://images.unsplash.com/photo-1521671413015-ce2b0104c5c7?auto=format&fit=crop&w=400&q=80',
                specs: ['Sub-mm Precision', 'HDR Imaging', 'The Robot Mounted'],
                cta: 'VIEW SPECS'
            }
        ],
        sections: [
            {
                title: 'Construction Solutions',
                items: [
                    { title: 'Progress Tracking', desc: 'Compare as-built status against BIM models automatically.' },
                    { title: 'Digital Twin', desc: 'High-fidelity 3D reconstructions for facility management.' },
                    { title: 'Worker Safety', desc: 'Identify hazards like open pits or blocked exits via AI vision.' }
                ]
            }
        ]
    },
    'academia': {
        title: 'Education & Academia',
        subtitle: 'Empowering the next generation of roboticists.',
        image: 'https://images.unsplash.com/photo-1523240715637-bf997e6e47ad?auto=format&fit=crop&w=1200&q=80',
        content: 'The Robot is the preferred platform for teaching robotics, computer vision, and AI. Used by top universities worldwide to train future engineers.',
        itemsTitle: 'Academic Packages',
        items: [
            {
                name: 'University Lab Set',
                image: 'https://images.unsplash.com/photo-1523240715637-bf997e6e47ad?auto=format&fit=crop&w=400&q=80',
                specs: ['Curriculum Ready', 'Multi-user Lic', 'Dedicated Support'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Educational Focus',
                items: [
                    { title: 'Computer Vision', desc: 'Process 3D point clouds and real-time video streams.' },
                    { title: 'SLAM Algorithms', desc: 'Develop the future of simultaneous localization and mapping.' },
                    { title: 'Social Robotics', desc: 'Study human-robot interaction in real-world settings.' }
                ]
            }
        ]
    },
    'hotel': {
        title: 'Hospitality & Commercial',
        subtitle: 'Enhance guest experiences with service robots.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        content: 'Robots can deliver room service, assist with luggage, and provide concierge services, freeing up staff to focus on personal guest interactions.',
        itemsTitle: 'Service Fleet',
        items: [
            {
                name: 'Concierge-Bot Pro',
                image: 'https://images.unsplash.com/photo-1561557944-6eda7a488ba8?auto=format&fit=crop&w=400&q=80',
                specs: ['Elevator Sync', 'Secure Storage', 'Dynamic Pathing'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Hospitality Benefits',
                items: [
                    { title: 'Prompt Delivery', desc: 'Deliver items to guest rooms 24/7 without delays.' },
                    { title: 'Discreet Operation', desc: 'Robots operate quietly in hallway environments.' },
                    { title: 'High-Tech Appeal', desc: 'A unique touchpoint that delights modern travelers.' }
                ]
            }
        ]
    },



    // Company
    'about-us': {
        title: 'We are Robot Being',
        subtitle: 'Building a better world through robotics.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        content: 'Our mission is to imagine and create exceptional robots that enrich people\'s lives. We build machines that can go where people go and do what people do.',
        sections: [
            {
                title: 'Our Journey',
                items: [
                    { title: '1992-2024', desc: 'Decades of hardware innovation and pioneering research.' },
                    { title: 'Global Impact', desc: 'Over 10,000 robots deployed in 60+ countries.' },
                    { title: 'Future-Proof', desc: 'Leading the bridge between AI and physical mobility.' }
                ]
            }
        ]
    },
    'careers': {
        title: 'Join the Future',
        subtitle: 'Build the next generation of robots.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
        content: 'We are looking for talented engineers and dreamers. Check out our high-impact teams across the globe.',
        itemsTitle: 'Open Roles',
        items: [
            {
                name: 'Robotics Engineer',
                image: 'https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&w=400&q=80',
                specs: ['Robot Being HQ', 'C++/Python', 'Full-time'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'AI Researcher',
                image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=400&q=80',
                specs: ['Remote Opt.', 'Deep Learning', 'Ph.D Pref.'],
                cta: 'APPLY NOW'
            }
        ]
    },
    'ethics': {
        title: 'Ethics & Responsibility',
        subtitle: 'Our commitment to proper use.',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
        content: 'We strictly prohibit the weaponization of our robots. We believe that robots should be used to enhance human safety and productivity, not to harm.',
        sections: [
            {
                title: 'Ethical Principles',
                items: [
                    { title: 'Non-Weaponization', desc: 'Strict no-weapons policy for all hardware platforms.' },
                    { title: 'Human Agency', desc: 'Robots should always be under effective human oversight.' },
                    { title: 'Data Privacy', desc: 'Commitment to the highest standards of data security.' }
                ]
            }
        ]
    },
    'news': {
        title: 'Latest News & Lab Updates',
        subtitle: 'Innovations from the lab to the field.',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
        content: 'Stay updated with our latest breakthroughs and customer success stories worldwide.',
        itemsTitle: 'Top Stories',
        items: [
            {
                name: 'Advanced Humanoid New Dance!',
                image: 'https://images.unsplash.com/photo-1533234458044-95c8d7621c10?auto=format&fit=crop&w=400&q=80',
                specs: ['3.5M Views', 'AI Control', 'Viral Lab'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'The Robot in Pompeii',
                image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=400&q=80',
                specs: ['Archaeology', 'Autonomy', 'Case Study'],
                cta: 'CONTACT FOR DETAILS'
            }
        ]
    },
    'partners': {
        title: 'Our Global Partners',
        subtitle: 'Expanding the possibilities together.',
        image: 'https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&w=1200&q=80',
        content: 'Join our ecosystem of hardware and software developers to extend the reach of mobile robotics.',
        itemsTitle: 'Partner Categories',
        items: []
    },
    'videos': {
        title: 'Video Archive',
        subtitle: 'Watch our robots in action.',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
        content: 'From early prototypes to current deployments, explore the visual history of our machines.',
        itemsTitle: 'Featured Videos',
        items: []
    },


    // --- Humanoid Robots Features ---
    'humanoid-rental': {
        title: 'Humanoid Rental Solutions',
        subtitle: 'Flexible robotics for your business needs.',
        image: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=1200&q=80',
        content: 'Our rental program provides access to the world\'s most advanced humanoid robots without the upfront capital investment. Whether you need a robot for a week or a year, we offer flexible terms and full technical support.',
        itemsTitle: 'Available for Rental',
        items: [],
        sections: [
            {
                title: 'Why Rent Humanoid Robots?',
                items: [
                    { title: 'Zero Maintenance', desc: 'We handle all hardware updates and repairs.' },
                    { title: 'Scalability', desc: 'Add more units to your fleet as your project grows.' },
                    { title: 'Latest Tech', desc: 'Always have access to the most recent hardware versions.' }
                ]
            }
        ]
    },
    'humanoid-expos': {
        title: 'Robots for Expos & Trade Shows',
        subtitle: 'Capture attention and engage your audience.',
        image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
        content: 'Make a lasting impression at your next event. Our humanoid robots are designed to interact with visitors, deliver presentations, and create memorable experiences that set your booth apart.',
        itemsTitle: 'Exhibition Fleet',
        items: [],
        sections: [
            {
                title: 'Engagement Features',
                items: [
                    { title: 'AI Interaction', desc: 'Natural language processing for guest Q&A.' },
                    { title: 'Custom Branding', desc: 'Apply your logo and colors to the robot chassis.' },
                    { title: 'Social Integration', desc: 'Robots can take photos and post directly to social media.' }
                ]
            }
        ]
    },
    'humanoid-events': {
        title: 'Event & Hospitality Robots',
        subtitle: 'The future of guest interaction.',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=1200&q=80',
        content: 'From corporate galas to private functions, our robots add a touch of innovation and excitement. They can greet guests, serve drinks, and provide entertainment.',
        itemsTitle: 'Hospitality Models',
        items: [],
        sections: [
            {
                title: 'Hospitality Services',
                items: [
                    { title: 'Greeting & Gifting', desc: 'Personalized welcomes and distribution of event materials.' },
                    { title: 'Service Integration', desc: 'Integration with catering systems for drink and snack delivery.' },
                    { title: 'Coordinated Entertainment', desc: 'Synchronized robot dances and light shows.' }
                ]
            }
        ]
    },
    'humanoid-agriculture': {
        title: 'Humanoid Robots in Agriculture',
        subtitle: 'Precision labor for the modern farm.',
        image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        content: 'Automate delicate tasks that require human-like dexterity. Our bipedal platforms can navigate uneven terrain to assist with selective harvesting and laboratory research.',
        itemsTitle: 'Agri-Humanoid Fleet',
        items: [],
        sections: [
            {
                title: 'Agricultural Applications',
                items: [
                    { title: 'Selective Harvesting', desc: 'Pick delicate fruits and vegetables without damage.' },
                    { title: 'Crop Monitoring', desc: 'Close-up health assessment of individual plants.' },
                    { title: 'Autonomous Sampling', desc: 'Consistent soil and tissue sampling across diverse terrains.' }
                ]
            }
        ]
    },

    // --- Drone Features ---
    'drone-agriculture': {
        title: 'Agricultural Drones',
        subtitle: 'Elevating farm productivity.',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
        content: 'Monitor crop health from above with multi-spectral imaging. Our drone solutions automate field mapping and precision spraying, reducing resource waste and maximizing yields.',
        itemsTitle: 'Precision Agri-Hardware',
        items: [],
        sections: [
            {
                title: 'Farming Benefits',
                items: [
                    { title: 'Resource Efficiency', desc: 'Targeted spraying reduces chemical use by up to 30%.' },
                    { title: 'Real-time Monitoring', desc: 'Identify pest outbreaks before they spread.' },
                    { title: 'Autonomous Workflows', desc: 'Schedule flights for consistent data capture.' }
                ]
            }
        ]
    },
    'drone-survey': {
        title: 'Land Survey & Mapping',
        subtitle: 'High-precision geospatial data.',
        image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&w=1200&q=80',
        content: 'Generate accurate 3D models and topographical maps in minutes. Our survey drones are equipped with high-resolution sensors and RTK capabilities for centimeter-level accuracy.',
        itemsTitle: 'Survey Grade Systems',
        items: [],
        sections: [
            {
                title: 'Data Deliverables',
                items: [
                    { title: 'Digital Twins', desc: 'Accurate 3D reconstructions of infrastructure.' },
                    { title: 'Orthomosaics', desc: 'High-resolution maps of your entire property.' },
                    { title: 'Volumetric Data', desc: 'Precise volume measurements of stockpiles.' }
                ]
            }
        ]
    },
    'drone-education': {
        title: 'Drones in Education',
        subtitle: 'Preparing the pilots of tomorrow.',
        image: 'https://images.unsplash.com/photo-1533234458044-95c8d7621c10?auto=format&fit=crop&w=1200&q=80',
        content: 'Inspire students with hands-on robotics and coding. Our educational drone kits come with comprehensive curricula for all levels, from basic flight to advanced SDK programming.',
        itemsTitle: 'Educational Kits',
        items: [],
        sections: [
            {
                title: 'Curriculum Focus',
                items: [
                    { title: 'Flight Mechanics', desc: 'Understanding aerodynamics and sensor fusion.' },
                    { title: 'Computer Vision', desc: 'Programming drones to recognize objects.' },
                    { title: 'Cybersecurity', desc: 'Learning to secure drone communication links.' }
                ]
            }
        ]
    },
    'drone-media': {
        title: 'Aerial Media & Cinematography',
        subtitle: 'Cinematic perspectives from the sky.',
        image: 'https://images.unsplash.com/photo-1473960104332-99ca4453c1ce?auto=format&fit=crop&w=1200&q=80',
        content: 'Capture breathtaking footage with our specialized media drones. Supporting cinema-grade cameras and advanced stabilization for stunning visual results.',
        itemsTitle: 'Cinema Hardware',
        items: [],
        sections: [
            {
                title: 'Production Features',
                items: [
                    { title: 'ProRes Workflow', desc: 'Direct capture to filmmaker-standard formats.' },
                    { title: 'ActiveTrack Pro', desc: 'Unmatched subject following in complex environments.' },
                    { title: 'High Wind Stability', desc: 'Capture stable shots in challenging weather.' }
                ]
            }
        ]
    },

    // --- Security Features ---
    'security-cameras': {
        title: 'AI-Powered Cameras',
        subtitle: 'Intelligent vision for total security.',
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
        content: 'Our cameras don\'t just record; they understand. Real-time object recognition and facial analysis allow for instant alerting of unauthorized personnel.',
        itemsTitle: 'Advanced AI Vision',
        items: [],
        sections: [
            {
                title: 'Smart Analytics',
                items: [
                    { title: 'Facial Recognition', desc: 'Secure access control with multi-factor biometric analysis.' },
                    { title: 'Behavior Analysis', desc: 'Detect suspicious actions like loitering or trespassing.' },
                    { title: 'Privacy Shield', desc: 'Automatic masking of sensitive areas for compliance.' }
                ]
            }
        ]
    },
    'security-threat-detection': {
        title: 'Autonomous Threat Detection',
        subtitle: 'Predicting risks before they happen.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
        content: 'Leverage machine learning to identify suspicious patterns and anomalies. Our system monitors site activity 24/7, detecting potential breaches with unmatched speed.',
        itemsTitle: 'Multi-Modal Sensors',
        items: [],
        sections: [
            {
                title: 'Sensing Spectrum',
                items: [
                    { title: 'Acoustic Sensing', desc: 'Identify sounds of glass breaking or distress in real-time.' },
                    { title: 'Thermal Imaging', desc: 'Detect heat signatures in total darkness or adverse weather.' },
                    { title: 'Signal Intelligence', desc: 'Monitor for unauthorized wireless signal presence.' }
                ]
            }
        ]
    },
    'security-agentic': {
        title: 'Agentic & Specialized AI Security',
        subtitle: 'Proactive protection by intelligent agents.',
        image: 'https://images.unsplash.com/photo-1563986768494-0d253928a24c?auto=format&fit=crop&w=1200&q=80',
        content: 'Deploy autonomous security agents capable of decision-making in the field. These specialized AI models manage perimeter patrols and access control autonomously.',
        itemsTitle: 'Autonomous Response Units',
        items: [],
        sections: [
            {
                title: 'The AI Advantage',
                items: [
                    { title: 'Dynamic Patrols', desc: 'Non-repetitive, unpredictable routes to maximize detection.' },
                    { title: 'Rapid Dispatch', desc: 'Instant dispatch of drone support to hotspots.' },
                    { title: 'Autonomous Reasoning', desc: 'Evaluate threat levels and execute protocols.' }
                ]
            }
        ]
    },

    // --- AI Gadgets Features ---
    'ai-companion': {
        title: 'Interactive AI Companions',
        subtitle: 'Robots designed for connection.',
        image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?auto=format&fit=crop&w=1200&q=80',
        content: 'Enhance your daily life with an AI companion that learns your preferences. Our social robots provide personal assistance, entertainment, and a supportive presence.',
        itemsTitle: 'Meet Your Companion',
        items: [],
        sections: [
            {
                title: 'Your Social Partner',
                items: [
                    { title: 'Emotional Intelligence', desc: 'Recognize human emotions and respond with empathy.' },
                    { title: 'Natural Dialogue', desc: 'Engage in context-aware conversations that feel real.' },
                    { title: 'Personalized Help', desc: 'Manage your schedule and control your home with a friend.' }
                ]
            }
        ]
    },
    'ai-hubs': {
        title: 'Voice Activated AI Hubs',
        subtitle: 'The intelligent heart of your home.',
        image: 'https://images.unsplash.com/photo-1589254066213-a0c9dc853511?auto=format&fit=crop&w=1200&q=80',
        content: 'Control your entire environment with natural conversation. Our AI hubs integrate seamlessly with all your smart devices, providing an intuitive interface.',
        itemsTitle: 'Home Core Systems',
        items: [],
        sections: [
            {
                title: 'Seamless Integration',
                items: [
                    { title: 'Holistic Control', desc: 'Unified interface for 10,000+ certified smart devices.' },
                    { title: 'Far-field Audio', desc: 'Crystal clear voice pickup from any corner of the room.' },
                    { title: 'Privacy Focused', desc: 'Optional local-only processing for maximum data security.' }
                ]
            }
        ]
    },
    'ai-safety': {
        title: 'AI Safety & Health Monitoring',
        subtitle: 'Watching over what matters most.',
        image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&w=1200&q=80',
        content: 'Ensure the well-being of your loved ones with AI-driven monitoring. Our system detects falls and monitors health metrics, providing peace of mind.',
        itemsTitle: 'Guardian Devices',
        items: [
            {
                name: 'SafeHome Sensor Pro',
                image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&w=400&q=80',
                specs: ['Fall Detection', 'CO2/Smoke Guard', 'Emergency Beacon'],
                cta: 'CONTACT FOR DETAILS'
            },
            {
                name: 'Health-Link Wearable',
                image: 'https://images.unsplash.com/photo-1557825835-b74677a2886f?auto=format&fit=crop&w=400&q=80',
                specs: ['Vitals AI', 'GPS Tracking', 'Direct Nurse Line'],
                cta: 'CONTACT FOR DETAILS'
            }
        ],
        sections: [
            {
                title: 'Protective Features',
                items: [
                    { title: 'Fall Detection', desc: 'Instant precision alerts sent to caregivers or emergency services.' },
                    { title: 'Vital Tracking', desc: 'Continuous heart rate and respiratory monitoring via AI.' },
                    { title: 'Environmental Scan', desc: 'Detect gas leaks, smoke, or unusual noise patterns.' }
                ]
            }
        ]
    },

    // Category Roots (from Main Nav clicks)
    'products': {
        title: 'Advanced Robotics Portfolio',
        subtitle: 'Engineering the future of mobility.',
        image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
        content: 'From the precision of our humanoid platforms to the aerial versatility of our drone fleets, our hardware is designed to solve the world\'s most complex physical challenges.',
        itemsTitle: 'Product Categories',
        items: [],
        sections: [
            {
                title: 'Building for the Real World',
                items: [
                    { title: 'Global Support', desc: 'Deploy with confidence with our 24/7 technical support network.' },
                    { title: 'Open Ecosystem', desc: 'Powerful SDKs for custom application development.' },
                    { title: 'Safe Design', desc: 'Built-in safety protocols for collaborative environments.' }
                ]
            }
        ]
    },
    'solutions': {
        title: 'Technology Solutions',
        subtitle: 'Solving business-critical challenges.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        content: 'We don\'t just build robots; we solve problems. Our solutions are hard at work across millions of square feet of industrial space, keeping people safe and operations efficient.',
        itemsTitle: 'Key Solution Areas',
        items: [],
        sections: [
            {
                title: 'Implementation Framework',
                items: [
                    { title: 'Discovery', desc: 'We identify the tasks where robotics can make the most impact.' },
                    { title: 'Integration', desc: 'Seamlessly connect robots to existing business systems.' },
                    { title: 'Optimization', desc: 'Continuous feedback loops to improve fleet performance.' }
                ]
            }
        ]
    },
    'industries': {
        title: 'Transformed Industries',
        subtitle: 'Unlocking potential across every sector.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        content: 'Mobile robotics is no longer futuristic—it\'s foundational. See how the world\'s leading organizations are using our technology to gain a competitive edge.',
        itemsTitle: 'Sectors We Serve',
        items: [],
        sections: [
            {
                title: 'Industry Standards',
                items: [
                    { title: 'Compliance', desc: 'Hardware certified for rigorous industrial environments.' },
                    { title: 'Innovation', desc: 'Stay ahead of the curve with cutting-edge mobile sensors.' },
                    { title: 'ROI Driven', desc: 'Measurable improvements in safety and efficiency.' }
                ]
            }
        ]
    },

    'company': {
        title: 'Our Mission & Team',
        subtitle: 'Engineering excellence for a better world.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        content: 'We are a team of visionaries, engineers, and problem solvers dedicated to pushing the boundaries of what robots can do.',
        itemsTitle: 'Who We Are',
        items: [],
        sections: [
            {
                title: 'Our Values',
                items: [
                    { title: 'Excellence', desc: 'We never settle for "good enough" in our engineering or design.' },
                    { title: 'Safety First', desc: 'Robots must enhance human life and security at all times.' },
                    { title: 'Transparency', desc: 'Open communication with our partners and the public.' }
                ]
            }
        ]
    },
    'resources': {
        title: 'Knowledge & Media Hub',
        subtitle: 'Stay informed on the robotics revolution.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        content: 'Explore our library of insights, customer success stories, and technical deep-dives into the world of advanced robotics.',
        itemsTitle: 'Media Channels',
        items: [],
        sections: [
            {
                title: 'Education Center',
                items: [
                    { title: 'Documentation', desc: 'Full API guides and hardware specifications for developers.' },
                    { title: 'Webinars', desc: 'Live sessions with our lead engineers and researchers.' },
                    { title: 'Community', desc: 'Join the global network of Robot Being enthusiasts.' }
                ]
            }
        ]
    },
    'contact': {
        title: 'Contact Our Team',
        subtitle: 'Ready to deploy advanced robotics?',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
        content: 'Our team is ready to help you find the right solution for your needs. Please fill out the form below.'
    }
};

function GenericPage() {
    const { slug } = useParams();
    const [liveRobots, setLiveRobots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cmsPageData, setCmsPageData] = useState(null);
    const [cmsLoading, setCmsLoading] = useState(false);

    const categoryMapping = {
        'driverless-': 'Driverless Car',
        'humanoid-': 'Humanoid Robots',
        'drone-': 'Drones',
        'security-': 'Security Gadgets',
        'ai-': 'Essential AI Gadgets and Smart Homes'
    };

    const exactMappings = {
        'mobile': { category: 'Electronics Gadgets', subCategory: 'Mobile' },
        'laptop': { category: 'Electronics Gadgets', subCategory: 'Laptop' },
        'robot-vacuum': { category: 'Essential', subCategory: 'Robot Vacuum Cleaner' },
        'robot-mop': { category: 'Essential', subCategory: 'Robot Mop' },
        'kitchen-robot': { category: 'Essential', subCategory: 'Kitchen Cooking Robot' }
    };

    const getCurrentCategory = () => {
        // console.log('GenericPage rendering with slug:', slug);
        if (!slug) return { category: null, subCategory: null };

        // Check exact mappings first
        if (exactMappings[slug]) {
            return exactMappings[slug];
        }

        for (const prefix in categoryMapping) {
            if (slug.startsWith(prefix)) {
                // Determine sub-category from slug (e.g., humanoid-rental -> Rental)
                const subStr = slug.replace(prefix, '').split('-')[0];
                const subCategory = subStr ? subStr.charAt(0).toUpperCase() + subStr.slice(1) : '';
                return {
                    category: categoryMapping[prefix],
                    subCategory: subCategory
                };
            }
        }
        return { category: null, subCategory: null };
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch CMS page content from database
        // setCmsLoading(true);
        // fetch(`http://localhost:5000/api/pages/${slug}`)
        //     .then(res => {
        //         if (!res.ok) throw new Error('Page not found in CMS');
        //         return res.json();
        //     })
        //     .then(data => {
        //         console.log('Loaded page from CMS:', data);
        //         setCmsPageData(data);
        //         setCmsLoading(false);
        //     })
        //     .catch(err => {
        //         console.log('CMS page not found, using hardcoded content:', err.message);
        //         setCmsPageData(null);
        //         setCmsLoading(false);
        //     });
        setCmsPageData(null);
        setCmsLoading(false);

        // Fetch live robots for product pages
        const { category, subCategory } = getCurrentCategory();
        if (category) {
            setLoading(true);
            fetch('http://localhost:5000/api/robots')
                .then(res => res.json())
                .then(data => {
                    // Filter by main category AND sub-category if specified
                    const filtered = data.filter(r => {
                        const matchesMain = r.type === category;
                        const matchesSub = !subCategory || r.sub_category?.toLowerCase() === subCategory.toLowerCase();
                        return matchesMain && matchesSub;
                    });
                    setLiveRobots(filtered);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch live robots:", err);
                    setLoading(false);
                });
        } else {
            setLiveRobots([]);
        }
    }, [slug]);

    // Use CMS data if available, otherwise fall back to hardcoded content
    let data;
    if (cmsPageData && cmsPageData.page) {
        // Transform CMS data to match expected format
        const cmsPage = cmsPageData.page;
        data = {
            title: cmsPage.title,
            subtitle: cmsPage.subtitle || '',
            image: cmsPage.hero_image || '',
            content: cmsPage.content || '',
            itemsTitle: 'Featured Items',
            items: (cmsPageData.items || []).map(item => ({
                id: item.id,
                name: item.name,
                image: item.image_url || '',
                specs: item.specs || [],
                cta: item.cta_text || 'CONTACT FOR DETAILS',
                description: item.description
            })),
            sections: (cmsPageData.sections || []).map(section => ({
                title: section.title,
                items: section.data || []
            }))
        };
    } else {
        // Fall back to hardcoded content
        data = pageContent[slug] || {
            title: slug.replace(/-/g, ' ').toUpperCase(),
            subtitle: 'Page under construction',
            content: 'Content coming soon for this section.'
        };
    }

    // Merge live robots into items if it's a rental/product page
    const displayItems = [...(data.items || [])];

    // Create mapping for existing item names to avoid duplicates
    const existingNames = new Set(displayItems.map(item => item.name.toLowerCase()));

    liveRobots.forEach(robot => {
        if (!existingNames.has(robot.name.toLowerCase())) {
            displayItems.push({
                id: robot.id,
                name: robot.name,
                image: robot.image_url || 'https://via.placeholder.com/400x300?text=No+Image',
                specs: [robot.type, 'Latest Model'],
                cta: 'CONTACT FOR DETAILS',
                isLive: true
            });
        }
    });

    // Show loading state while fetching CMS data
    if (cmsLoading) {
        return (
            <div className="generic-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid var(--color-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p style={{ color: '#666', fontSize: '1rem' }}>Loading content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="generic-page">
            <div
                className="generic-hero"
                style={{
                    backgroundImage: data.image ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${data.image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="generic-hero-content">
                    <h1>{data.title}</h1>
                    <p className="subtitle">{data.subtitle}</p>
                </div>
            </div>
            <div className="generic-body">
                <div className="content-container">
                    {loading && <div className="loading-indicator">Updating fleet data...</div>}
                    <p className="main-text">{data.content}</p>

                    {displayItems.length > 0 && (
                        <div className="items-section">
                            {data.itemsTitle && <h2 className="section-title">{data.itemsTitle}</h2>}
                            <div className="feature-grid">
                                {displayItems.map((item, index) => (
                                    <div key={index} className="robot-card">
                                        <div className="card-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="card-content">
                                            <h3>{item.name}</h3>
                                            <div className="spec-pills">
                                                {item.specs.map((spec, sIdx) => (
                                                    <span key={sIdx} className="spec-pill">{spec}</span>
                                                ))}
                                            </div>
                                            {item.isLive ? (
                                                <Link to="/pages/contact" className="cta-button secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>{item.cta || 'CONTACT FOR DETAILS'}</Link>
                                            ) : (
                                                <button className="cta-button secondary">{item.cta || 'CONTACT FOR DETAILS'}</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.sections && data.sections.map((section, idx) => (
                        <div key={idx} className="rich-section">
                            <h2 className="section-title">{section.title}</h2>
                            <div className="section-grid">
                                {section.items.map((item, iIdx) => (
                                    <div key={iIdx} className="section-card">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
}

export default GenericPage;
