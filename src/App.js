import { useState } from 'react';
import Container from './components/Container/Container';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Section from './components/Section/Section';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

export default function App() {
    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const handleAddStatistics = statistic => {
        setState(prevStatistic => ({
            ...state,
            [statistic]: prevStatistic[statistic] + 1,
        }));
    };

    const countTotalFeedback = () => {
        return Object.values(state).reduce((acc, item) => acc + item, 0);
    };

    const countPositiveFeedbackPercentage = () => {
        return Math.round((state.good / countTotalFeedback()) * 100) || 0;
    };

    return (
        <Container title="Cafe «Expresso»">
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={state}
                    onLeaveFeedback={handleAddStatistics}
                />
            </Section>
            <Section title="Statistics">
                {countTotalFeedback() ? (
                    <Statistics
                        options={state}
                        // good={}
                        // neutral={}
                        // bad={}
                        total={countTotalFeedback()}
                        positivePercentage={countPositiveFeedbackPercentage()}
                    />
                ) : (
                    <Notification message="No feedback given" />
                )}
            </Section>
        </Container>
    );
}
