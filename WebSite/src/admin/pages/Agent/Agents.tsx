import Loader from '../../../components/common/Loader'
import useAgents from '../../../hooks/useAgents'
import AgentList from '../../components/Agents/AgentsList'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'

const Agents = () => {
    const { agents, fetchAgents, activateAgent, deactivateAgent, deleteAgent, updateCommissionRate, loading } = useAgents()

    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Active Agents" />
            <div className="flex flex-col gap-10 ">
                <AgentList
                    fetchAgents={fetchAgents}
                    allAgents={agents}
                    deleteAgent={deleteAgent}
                    deactivateAgent={deactivateAgent}
                    activateAgent={activateAgent}
                    updateCommissionRate={updateCommissionRate}
                    loading
                />
            </div>
        </>
    )
}

export default Agents