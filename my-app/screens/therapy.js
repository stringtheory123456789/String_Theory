
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, SafeAreaView } from 'react-native';

const TherapyScreen = () => {
  const [severity, setSeverity] = useState(null);

  const treatmentPlans = {
    lessDepressed: {
      title: 'Treatment Plan for Less Depressed Users',
      sections: [
        {
          title: 'A. Psychotherapy',
          content: `
          1. Cognitive Behavioral Therapy (CBT):
          - *Initial Assessment*: Conduct a thorough clinical interview to identify cognitive distortions and maladaptive thought patterns. Use psychological assessment tools like the Beck Depression Inventory (BDI-II) to quantify the severity of symptoms.
          - *Weekly Sessions (12-16 weeks)*:
            - *Session 1-2*: Psychoeducation about depression and CBT principles, focusing on the connection between thoughts, emotions, and behaviors.
            - *Session 3-4*: Introduction to cognitive restructuring techniques to identify and challenge automatic negative thoughts.
            - *Session 5-8*: Behavioral activation exercises to gradually increase engagement in pleasurable activities.
            - *Session 9-12*: Explore core beliefs and schemas that contribute to negative thinking patterns.
            - *Session 13-16*: Consolidation and relapse prevention strategies.
          - *Homework*: Assign tasks like keeping a thought diary, engaging in pleasurable activities, and practicing cognitive and behavioral techniques outside of sessions.
          `,
        },
        {
          title: 'B. Lifestyle Modifications',
          content: `
          1. Exercise:
          - Aim for 30-60 minutes of moderate-intensity aerobic exercise (e.g., brisk walking, swimming) at least 5 days per week.
          - Incorporate strength training exercises at least twice a week to improve overall physical health and boost mood.
          - Emphasize the enjoyment of activities to enhance adherence and motivation.

          2. Sleep Hygiene:
          - Maintain a consistent sleep-wake schedule, aiming for 7-9 hours of quality sleep each night.
          - Create a calming bedtime routine, including dimming lights, reading, or listening to soothing music.
          - Limit screen time before bed to avoid blue light exposure.

          3. Diet and Nutrition:
          - Encourage a balanced diet rich in whole foods, fruits, vegetables, and lean proteins.
          - Reduce intake of sugar and processed foods, which can exacerbate mood swings.
          - Stay hydrated by drinking at least 8 glasses of water per day.
          `,
        },
        {
          title: 'C. Mindfulness and Relaxation Techniques',
          content: `
          1. Mindfulness-Based Cognitive Therapy (MBCT):
          - Encourage daily mindfulness meditation practice of 10-20 minutes, focusing on present-moment awareness.
          - Introduce techniques such as body scan meditation and mindful walking to increase engagement with the present moment.

          2. Progressive Muscle Relaxation (PMR):
          - Teach users to perform a daily 10-15 minute PMR routine, systematically tensing and relaxing different muscle groups.
          - Incorporate deep breathing exercises to enhance relaxation.
          `,
        },
        {
          title: 'D. Regular Monitoring and Follow-Up',
          content: `
          1. Monthly Check-ins:
          - Schedule follow-up therapy sessions every month to assess progress and address challenges.
          - Use mood tracking logs where users record their daily mood on a scale of 1-10 along with notes on significant events or stressors.

          2. Feedback and Adjustments:
          - Provide regular feedback to the user about their progress, discussing both positive changes and areas needing attention.
          - Utilize self-assessment quizzes periodically to help users reflect on their emotional journey and progress in treatment.
          `,
        },
      ],
    },
    depressed: {
      title: 'Treatment Plan for Depressed Users',
      sections: [
        {
          title: 'A. Psychotherapy',
          content: `
          1. Cognitive Behavioral Therapy (CBT):
          - *Session Structure (16-20 weeks)*:
            - *Initial Sessions*: Conduct psychoeducation about depression and introduce thought records.
            - *Mid-Treatment*: Focus on cognitive restructuring to challenge negative thoughts and behavioral activation to increase engagement in rewarding activities.
            - *Final Sessions*: Emphasize relapse prevention strategies and consolidate gains.
          - *Techniques*:
            - *Thought Records*: Users track their automatic negative thoughts, identify cognitive distortions, and challenge them with balanced thoughts.
            - *Behavioral Experiments*: Encourage users to test the validity of their negative beliefs through real-life experiments to gather evidence against their pessimistic views.
            - *Pleasure and Mastery*: Help users rate activities based on pleasure and mastery to re-engage with life meaningfully.
          `,
        },
        {
          title: 'B. Medication',
          content: `
          1. Antidepressants:
          - *Initial Prescription*: Start with SSRIs (e.g., Sertraline, Fluoxetine) for their favorable side effect profile. Consider SNRIs (e.g., Venlafaxine) if symptoms include fatigue or pain.
          - *Monitoring and Adjustment*:
            - Schedule follow-up appointments every 2-4 weeks to assess response and side effects. Adjust dosage as needed.
            - Monitor for side effects like nausea, insomnia, and sexual dysfunction, adjusting the treatment plan accordingly.
          `,
        },
        {
          title: 'C. Lifestyle Modifications',
          content: `
          1. Exercise:
          - Encourage users to participate in structured exercise programs, engaging in 45 minutes of moderate-intensity exercise at least 5 times a week.
          - Suggest group activities to increase social interaction and motivation.

          2. Sleep Hygiene:
          - Emphasize the importance of maintaining a consistent sleep schedule. Consider referring users to sleep specialists if they experience insomnia.
          - Encourage the use of sleep diaries to track patterns and identify factors affecting sleep quality.
          `,
        },
      ],
    },
    veryDepressed: {
      title: 'Treatment Plan for Very Depressed Users',
      sections: [
        {
          title: 'A. Intensive Psychotherapy',
          content: `
          1. Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT):
          - *Weekly In-Depth Sessions*: Focus on cognitive restructuring, emotional regulation, and distress tolerance.
          - *Skills Training*: Teach distress tolerance and interpersonal effectiveness skills to manage emotional crises.
          - *Homework*: Assign skills practice for users to integrate into daily life.

          2. Support Groups:
          - Encourage participation in group therapy or support groups to reduce isolation and provide community support.
          - Facilitate discussions on shared experiences, coping strategies, and emotional processing.
          `,
        },
        {
          title: 'B. Medication Management',
          content: `
          1. Antidepressants:
          - *Initial Prescription*: Start with SSRIs/SNRIs; consider augmentation with mood stabilizers or atypical antipsychotics if necessary.
          - *Close Monitoring*: Schedule weekly follow-ups for adherence and side effect assessments, adjusting treatment as needed.
          `,
        },
        {
          title: 'C. Crisis Intervention and Safety Planning',
          content: `
          1. 24/7 Support:
          - Provide users with access to crisis hotlines and emergency services for immediate support.
          - Create a safety plan outlining warning signs, coping strategies, and emergency contacts.

          2. Safety Planning:
          - Work with users to develop personalized safety plans, identifying triggers and strategies to manage crises effectively.
          - Discuss coping strategies that can be employed during moments of distress.
          `,
        },
      ],
    },
  };

  const renderTreatmentPlan = () => {
    if (!severity) return null;

    const { title, sections } = treatmentPlans[severity];

    return (
      <View style={styles.planContainer}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView>
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.content}>{section.content}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>Mental Health Therapy Plans</Text>
      <View style={styles.container123}>
      <Button title="Less Depressed" onPress={() => setSeverity('lessDepressed')} />
      <Button title="Depressed" onPress={() => setSeverity('depressed')} />
      <Button title="Very Depressed" onPress={() => setSeverity('veryDepressed')} />
      </View>
      {renderTreatmentPlan()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: '#f5f5f5',
    
  },
    container123: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 80,
    alignSelf: 'center',
    textAlign: 'center'
  },
  planContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default TherapyScreen;
