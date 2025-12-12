'use client'

import React from 'react'
import { ActivityCard } from './ActivityCard'
import { FileText, Users, BrainCircuit } from 'lucide-react'

// Define the activity types
export type ActivityType = 'quiz' | 'checkup' | 'referral'

const ACTIVITIES = [
    {
        id: 'quiz',
        title: 'Daily Health Quiz',
        description: 'Answer 5 questions about common diseases to earn.',
        reward: 50,
        icon: <BrainCircuit className="w-6 h-6" />,
    },
    {
        id: 'checkup',
        title: 'Upload Checkup Report',
        description: 'Visit a partner hospital and upload your stamped report.',
        reward: 300,
        icon: <FileText className="w-6 h-6" />,
    },
    {
        id: 'referral',
        title: 'Refer a Friend',
        description: 'Get rewarded when your friends or family sign up.',
        reward: 200,
        icon: <Users className="w-6 h-6" />,
    },
]

interface ActivityFeedProps {
    onStartActivity: (type: ActivityType) => void
}

export function ActivityFeed({ onStartActivity }: ActivityFeedProps) {
    return (
        <div className="grid gap-4">
            {ACTIVITIES.map((activity) => (
                <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    reward={activity.reward}
                    icon={activity.icon}
                    onStart={() => onStartActivity(activity.id as ActivityType)}
                // In a real app we'd check if completed today
                />
            ))}
        </div>
    )
}
