import React, { useCallback, useState } from 'react';
import ReactFlow, { applyNodeChanges, applyEdgeChanges, Background, addEdge } from 'reactflow';

import type { Connection, Node, Edge, OnNodesChange, OnEdgesChange } from 'reactflow';

import { useLogs } from '../logs/useLogs';
import './WorkflowSimulator.css';

import DateNode from '../../shared/ui/DateNode';
import EndNode from '../../shared/ui/EndNode';
import LogsList from '../logs/LogList';
import MailNode from '../../shared/ui/MailNode';
import SmsNode from '../../shared/ui/SmsNode';
import StartNode from '../../shared/ui/StartNode';

type NodeType = 'start' | 'end' | 'sms' | 'mail' | 'date';

interface NodeData {
  isSelected: boolean;
}

type CustomNode = Node<NodeData, NodeType>;
type CustomEdge = Edge;

const nodeTypes = {
  end: EndNode,
  start: StartNode,
  mail: MailNode,
  sms: SmsNode,
  date: DateNode,
};

const initialNodes: CustomNode[] = [];
const initialEdges: CustomEdge[] = [];

const WorkflowSimulator: React.FC = () => {
  const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
  const [edges, setEdges] = useState<CustomEdge[]>(initialEdges);
  const [nodeTypeSelect, setNodeTypeSelect] = useState<NodeType>('start');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const { addLog } = useLogs();

  /** METHODS */
  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleNodeAction = () => {
    if (selectedNodeId) {
      setNodes((prev) =>
        prev.map((n) => (n.id === selectedNodeId ? { ...n, type: nodeTypeSelect } : n)),
      );
    } else {
      const newNode: CustomNode = {
        id: generateId(),
        type: nodeTypeSelect,
        position: { x: 100, y: 100 },
        data: { isSelected: false },
      };
      setNodes((prev) => [...prev, newNode]);
    }
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((prev) => applyNodeChanges(changes, prev) as CustomNode[]),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((prev) => applyEdgeChanges(changes, prev)),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((prev) => addEdge(params, prev)),
    [],
  );

  const startNodeTrigger = async () => {
    addLog('Start déclenché');
    await new Promise((res) => setTimeout(res, 500));
    addLog('Start fini');
    return true;
  };

  const endNodeTrigger = async () => {
    addLog('End déclenché');
    await new Promise((res) => setTimeout(res, 500));
    addLog('End fini');
    return true;
  };

  const dateNodeTrigger = async () => {
    await new Promise((res) => setTimeout(res, 500));
    addLog('Ajout de la date');
    return true;
  };

  const smsNodeTrigger = async () => {
    addLog('SMS déclenché');
    await new Promise((res) => setTimeout(res, 500));
    addLog('SMS réussi');
    return true;
  };

  const mailNodeTrigger = async () => {
    addLog('Mail déclenché');
    await new Promise((res) => setTimeout(res, 500));
    const success = Math.random() < 0.5;
    if (success) {
      addLog('Mail réussi');
      return true;
    } else {
      addLog('Mail échoué ! Workflow arrêté');
      return false;
    }
  };

  const runWorkflow = async () => {
    // is start node in wf
    const startNode = nodes.find((n) => n.type === 'start');

    // stop is not
    if (!startNode) {
      addLog("Impossible de démarrer : aucun node de type 'start' trouvé");
      return;
    }

    // get edges on start
    const startEdges = edges.filter((e) => e.source === startNode.id);

    // no edge(s), no start
    if (startEdges.length === 0) {
      addLog("Le node 'start' doit avoir au moins une edge sortante");
      return;
    }

    addLog('Démarrage de la simulation du workflow');

    // here add my custom node
    setNodes((prev) => {
      if (!prev.some((n) => n.type === 'date')) {
        const newDateNode: CustomNode = {
          id: generateId(),
          type: 'date',
          position: { x: 300, y: 300 },
          data: { isSelected: false },
        };
        return [...prev, newDateNode];
      }
      return prev;
    });

    // go recursive function each ndoe
    const processNode = async (nodeId: string) => {
      // find by id
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

      let success = true;

      // switch case
      switch (node.type) {
        case 'start':
          success = await startNodeTrigger();
          break;
        case 'sms':
          success = await smsNodeTrigger();
          break;
        case 'mail':
          success = await mailNodeTrigger();
          break;
        case 'date':
          success = await dateNodeTrigger();
          break;
        case 'end':
          success = await endNodeTrigger();
          break;
        default:
          success = false;
      }

      // stop if not success
      if (!success) {
        addLog(`Workflow interrompu au node ${node.id}`);
        return;
      }

      // get next edges from current node
      const nextEdges = edges.filter((e) => e.source === node.id);

      // start processNode with ALL next ndoe
      await Promise.all(nextEdges.map((e) => processNode(e.target)));
    };

    //  start processNode with ALL edges from start ndoe
    await Promise.all(startEdges.map((e) => processNode(e.target)));

    addLog('Simulation du workflow terminée');
  };

  /** RENDER */
  return (
    <div className="workflow-container">
      <div className="sidebar">
        <div className="card">
          <h4>{selectedNodeId ? 'Modifier le node' : 'Ajouter un node'}</h4>

          <label>
            Type :
            <select
              value={nodeTypeSelect}
              onChange={(e) => setNodeTypeSelect(e.target.value as NodeType)}
            >
              <option value="start">Start</option>
              <option value="end">End</option>
              <option value="sms">SMS</option>
              <option value="mail">Mail</option>
              <option value="date">Date</option>
            </select>
          </label>

          <div style={{ marginTop: '8px' }}>
            <button onClick={handleNodeAction} className="secondary-button">
              {selectedNodeId ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>

        <div className="card">
          <button onClick={runWorkflow} className="primary-button">
            Lancer la simulation
          </button>
        </div>

        <div className="card">
          <LogsList />
        </div>
      </div>

      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_e, node) => {
            const newSelected = selectedNodeId !== node.id;
            setSelectedNodeId(newSelected ? node.id : null);
            setNodes((prev) =>
              prev.map((n) => ({
                ...n,
                data: { ...n.data, isSelected: n.id === node.id ? newSelected : false },
              })),
            );
          }}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowSimulator;
