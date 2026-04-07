const topicsData =[
    {
        id: "cell",
        title: "Cell",
        description: "Anatomy and functions of the cell",
        questions: [
            {
                q: "Powerhouse of the cell is ___",
                options: ["Ribosome", "Mitochondria", "Core"],
                answer: 1,
                explanation: "Mitochondria produce ATP and are known as the powerhouse of th cell."
            },
            {
                q: "Which one contains DNA?",
                options: ["Core", "Cytoplasm", "Membrane"],
                answer: 0,
                explanation: "Core contains all cell's DNA."
            },
            {
                q: "Which structures contain genetic material?",
                options:["Nucleus", "Mitochindria", "Ribosome"],
                answers: [0, 2],
                explanation: "Both Nucleus and Ribosomes contain cell's genetic material in different forms."

            }
        ]

    },
    {
        id: "dna",
        title: "DNA",
        description: "Genetic information of the organism",
        questions: [
            {
                q: "What shape DNA is?",
                options: ["Linear", "Double helix", "Circle"],
                answer: 1,
                explanation: "DNA is the shape of doule helix, unlike RNA."
            },
            {
                q: "Identify the organelle shown in the image:",
                image: "image/mitochondria.png",
                options: ["Ribosome", "Mitochondria", "Golgi apparatus"],
                answer: 1,
                explanation: "The organelle on the image is mitochondria."
            }
        ]
    },
    {
        id: "rna",
        title: "RNA",
        description: "Genetic information of the organism",
        questions: [
            {
                q: "What shape DNA is?",
                options: ["Linear", "Double helix", "Circle"],
                answer: 1,
                explanation: "DNA is the shape of doule helix, unlike RNA."
            },
            {
                q: "Which of the pictures is mRna?",
                images: ["image/mRna.png", "image/tRna.jpeg"],
                options: ["Image 1", "Image 2"],
                answer: 0,
                explanation: "mRNA looks like one half of the DNA."
            },
            {
                q: "Which of the structures on the pictures are located in the core?",
                images: ["image/mRna.png", "image/dna.png", "image/tRna.jpeg"],
                options: ["Image 1", "Image 2", "Image 3"],
                answer: 1,
                explanation: "The core contains DNA of the cell."
            }
            
        ] 
    }, 
    {
        id: "bioshpere",
        title: "Biosphere",
        description: "life on Earth",
        questions: [
            {
                q: "Where does all energy come from?",
                options: ["Plants", "Sun", "Wind"],
                answer: 1,
                explanation: "The Sun brings all energy to Earth."
            },
            {
                q: "Which of the following considered to be in the base level on the pyramid on the picture?",
                image: "image/Ecological_Pyramid.png",
                options: ["A wolf", "A mushroom", "Grass"],
                answer: 2,
                explanation: "The base level of the energy pyramid are plants."
            },
            {
                q: "Which image shows mitochondria?",
                imageOptions: [
                    "image/mitochondria.png",
                    "image/dna.png",
                    "image/trna.jpeg"
                ],
                answer: 0,
                explanation: "Mitochondria is shown on the picture 1."
            }

            
        ]
    }

]