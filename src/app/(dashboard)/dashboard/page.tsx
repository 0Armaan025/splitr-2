import React from 'react'
import TopBar from './top-bar'
import StatBoard from '@/components/stat-board/statboard'
import Leaderboard from '@/components/leaderboard/leaderboard'
import GraphCards from '@/components/graph-cards/graphcards'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div className="dashboardPage">
        {/* what we need is a new layout, a sidebar, and a topbar :D */}

        <TopBar showCurrency={true} title='Dashboard'/>

        <div className=" flex flex-col justify-start items-start">
          <StatBoard/>
          <Leaderboard players={[{ rank: 1, name: "Player 1", score: 100 }, { rank: 2, name: "Player 2", score: 90 },{ rank: 2, name: "Player 2", score: 90 },{ rank: 2, name: "Player 2", score: 90 }, { rank: 2, name: "Player 2", score: 90 }]}/>
          
            <GraphCards
  pieData={{ labels: ['North', 'South', 'East', 'West'], values: [120, 80, 150, 90] }}
  barData={{ labels: ['Jan', 'Feb', 'Mar', 'Apr'], values: [50, 70, 40, 90] }}
/>
          
  

        </div>
    </div>
  )
}

export default DashboardPage