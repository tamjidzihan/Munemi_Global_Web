import Loader from '../../../components/common/Loader'
import useAgentApplications from '../../../hooks/useAgentApplications'
import AgentApplicationList from '../../components/AgentApplication/AgentApplicationList'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'


const AgentApplication = () => {
    const {
        agentApplications,
        createAgentApplication,
        deleteAgentApplication,
        approveAgentApplication,
        rejectAgentApplication,
        loading,
        fetchApplications
    } = useAgentApplications()



    if (loading) return <Loader />
    return (
        <>
            <Breadcrumb pageName="Agent Application" />
            <div className="flex flex-col gap-10 ">
                <AgentApplicationList
                    fetchApplications={fetchApplications}
                    createAgentApplication={createAgentApplication}
                    approveAgentApplication={approveAgentApplication}
                    rejectAgentApplication={rejectAgentApplication}
                    allApplications={agentApplications}
                    deleteApplication={deleteAgentApplication}
                    loading={loading}
                />
            </div>
        </>
    )
}

export default AgentApplication