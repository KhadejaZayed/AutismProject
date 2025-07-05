const Question = require('../Models/questionModel');

// exports.createQuestion = async (req, res) => {
//   try {
//     const { content, questionPicture, choices, correctChoice } = req.body;

//     //Validate that there are exactly 4 choices
//     if (!choices || choices.length !== 4) {
//       return res.status(400).json({ message: 'Exactly 4 choices are required' });
//     }

//     //Validate that rightAnswer is in the choices
//     if (!choices.includes(correctChoice)) {
//       return res.status(400).json({ message: 'Correct choice must be one of the choices' });
//     }

//     const newQuestion = new Question({
//       content,
//       questionPicture,
//       choices,
//       correctChoice
//     });

//     await newQuestion.save();

//     res.status(201).json({
//       message: 'Question has been created Successfully',
//       question: newQuestion
//     });
//   }catch(err){
//     res.status(500).json({
//       message: 'Failed to create question',
//       error: err.message
//     });
//   }
// };

exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  
  }catch(err){
    res.status(500).json({
      message: 'Failed to fetch question',
      error: err.message,
    });
  }
};


exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};
