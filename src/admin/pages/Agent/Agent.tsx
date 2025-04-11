import useAgentApplications from '../../../hooks/useAgentApplications'
import AgentApplicationList from '../../components/Agent/AgentApplicationList'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'


const Agent = () => {
    const { agentApplications, deleteAgentApplication } = useAgentApplications()


    return (
        <>
            <Breadcrumb pageName="Agent" />
            <div className="flex flex-col gap-10 ">
                <AgentApplicationList
                    allApplications={agentApplications}
                    deleteApplication={deleteAgentApplication}
                />
            </div>
        </>
    )
}

export default Agent