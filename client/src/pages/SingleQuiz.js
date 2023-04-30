import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Grid, Container, Typography, Button, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_QUIZ, GET_ME } from '../utils/queries';
import { ADD_QUIZ_RESPONSE } from '../utils/mutations';
import { generateRandomTest, readUserResponse, resetUserResponse } from '../utils/helpers';
import Iconify from '../components/iconify';
import OptionsLayer from '../sections/@dashboard/Assignments/OptionsLayer';
import StatusPanel from '../sections/@dashboard/Assignments/StatusPanel';

const theme = createTheme();
const quizDuration = 15;

export default function SinglequizPage() {
    const { _id } = useParams();
    const { loading, data } = useQuery(GET_QUIZ, { variables: { quizId: _id } });

    const { loading: loading1, data: data1 } = useQuery(GET_ME);
    const user = data1?.me || {};

    const [addQuizResponse, { error }] = useMutation(ADD_QUIZ_RESPONSE);

    const quiz = data?.getSingleQuiz || [];
    const questions = quiz.questions || [];

    // const recentAttempt = previousResponse[previousResponse.length - 1] || {};
    // const activateFlag = recentAttempt.grade === undefined;

    const [customQuestions, setCustomQuestions] = useState(questions);
    const [activateQuiz, setActivateQuiz] = useState(false);
    const [clearTimer, setClearTime] = useState(false);
    // const [rawScore, setRawScore] = useState(0);
    // const [grade, setGrade] = useState('N/A');
    // score = { rawScore } grade = { grade } 

    useEffect(() => {
        setCustomQuestions(questions);
    }, [questions]);

    const handleSubmit = async () => {
        if (!activateQuiz) return;
        console.log('submitting');
        setClearTime(true);
        await sendResults();
        // setTimer(0);
    };

    const sendResults = async () => {
        const scoreArray = readUserResponse('scoreArray');
        const responsesArray = readUserResponse('responseArray');
        console.log(scoreArray);
        console.log(responsesArray);

        const studentScore = scoreArray.reduce((sum, score) => score ? sum + score : sum + 0, 0);
        const score = (studentScore / questions.length) * 100;
        // setRawScore(score);

        const responses = responsesArray.map(response => response || "unanswered");
        const studentResponse = {
            responses,
            student: user._id,
            rawScore: score,
            quizId: _id
        };

        try {
            const { data } = await addQuizResponse({ variables: studentResponse });
            // setGrade(data.addQuizResponse.grade);
            // 👇 Will scroll smoothly to the top of the next section
            document.getElementById('quizPanel').scrollIntoView({ behavior: 'smooth' });
            setActivateQuiz(false);
            resetUserResponse();
        } catch (e) {
            console.error(e);
        }
    }

    const startQuiz = () => {
        const randomQuestions = generateRandomTest(questions);
        setCustomQuestions(randomQuestions);
        resetUserResponse();
        setActivateQuiz(true);
    };

    if (loading || loading1) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Helmet>
                <title>Quiz Page </title>
            </Helmet>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg" id="quizPanel" >
                    <Typography variant="h1" align='center' color='primary.main' fontWeight={'bolder'} >
                        {quiz.title}
                    </Typography>
                    <Typography sx={{m: 2}}>
                        <Link variant="subtitle2" 
                        onClick={() => window.location.assign('/dashboard/quizzes')}
                        sx={{ cursor: 'pointer', textAlign: 'center' }}
                        >Cancel</Link>
                    </Typography>
                    <Typography variant="h6" align='center' fontStyle={'italic'} color='primary.light'>
                        This quiz will be due on:
                    </Typography>
                    <Typography variant="h6" align='center' underline='always'>
                        {quiz.dueDate}
                    </Typography>

                    <StatusPanel quizId={_id} studentId={user._id} duration={quizDuration} quizStart={startQuiz} stopTimer={clearTimer} submitResults={sendResults} />

                    <Typography variant="h5" align='center' pt={3} fontStyle={'italic'} color='primary.main' >
                        Please Answer the Following Questions:
                        <div>
                            ______________________________________________________________
                        </div>
                        {customQuestions.map((question, index) => (
                            <>
                            <div key={index}>
                                <Typography variant="h5" align='center' color='common.black' fontWeight={'bold'} sx={{ m: 2 }} >
                                        ({index + 1}.) {question.title}
                                </Typography>

                                    <OptionsLayer question={question} questionNumber={index} enableQuiz={activateQuiz} />

                            </div>
                                <div>
                                    ______________________________________________________________
                                </div>
                            </>
                        ))}
                    </Typography>
                    <Button variant="contained" align="center" startIcon={<Iconify icon="eva:plus-fill" />}
                        sx={{ mt: 10 }}
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </Button>
                </Container>
            </ThemeProvider>
        </>
    );
}
