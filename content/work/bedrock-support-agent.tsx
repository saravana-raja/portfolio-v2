import { Callout } from "@/components/case/Callout";
import { Figure } from "@/components/case/Figure";
import { AgentFlow } from "@/components/diagrams/AgentFlow";
import { AgentEvalViewer } from "@/components/interactive/AgentEvalViewer";
import { site } from "@/lib/site";

export function BedrockAgentCase() {
  return (
    <div className="prose">
      <section id="context">
        <h2>
          <span className="n">01</span> Context
        </h2>
        <p>
          This was the capstone for the AWS AI/ML Scholars program: an enterprise
          support agent that can answer policy questions, troubleshoot common
          issues, and file an engineering ticket when a problem is real. The
          interesting part is not the chat interface — it is the boundary between
          &ldquo;the model said something&rdquo; and &ldquo;a ticket exists.&rdquo;
        </p>
        <p>
          I built it end to end on Amazon Bedrock AgentCore with Amazon Nova Pro:
          a streaming terminal client, a managed harness, a gateway-hosted tool,
          Lambda and DynamoDB for persistence, CloudFormation for infrastructure,
          and an evaluation pipeline built on Bedrock Model Evaluations.
        </p>
        <p>
          <a
            className="text-link"
            href={site.triageRepo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the source on GitHub ↗
          </a>
        </p>
      </section>

      <section id="constraints">
        <h2>
          <span className="n">02</span> Constraints
        </h2>
        <ul>
          <li>
            A bug ticket is only useful with three fields: description, steps to
            reproduce, and environment. The model must not invent any of them.
          </li>
          <li>
            Support answers must come from the supplied policy and FAQ, not from
            model memory.
          </li>
          <li>
            Sessions must not leak context into each other — no cross-customer
            contamination.
          </li>
          <li>
            Tool calls need a real schema, IAM permissions, and a persistence
            target, not a mock.
          </li>
          <li>
            Prompt changes need a measurable loop; otherwise every iteration is a
            vibe check.
          </li>
        </ul>
        <Callout tag="Constraint">
          <p>
            The hard requirement was behavioural, not technical: never file a
            ticket with fabricated reproduction steps. That constraint shaped the
            prompt, the tool schema, and the evaluation set.
          </p>
        </Callout>
      </section>

      <section id="architecture">
        <h2>
          <span className="n">03</span> Architecture
        </h2>
        <p>
          The client opens a stateful session against the AgentCore harness running
          Nova Pro with temperature 0 and topK 1. Policy and FAQ text are injected
          into the system prompt. When the model decides a ticket is needed, it
          calls the registered tool through AgentCore Gateway; a Lambda handler
          writes the record to DynamoDB and returns a ticket ID.
        </p>
        <Figure
          number="03.1"
          caption="The agent path, plus the evaluation loop that runs beside it."
          note="Infrastructure (DynamoDB, Lambda, IAM) is provisioned with CloudFormation."
        >
          <AgentFlow />
        </Figure>
        <p>
          The evaluation side is deliberately separate from the chat path. Test
          traces are generated from a curated test suite, formatted as JSONL, and
          submitted to a Bedrock model evaluation job using{" "}
          <code>Builtin.Correctness</code> and <code>Builtin.Completeness</code>.
          That makes prompt changes comparable instead of anecdotal.
        </p>
      </section>

      <section id="decisions">
        <h2>
          <span className="n">04</span> Decisions
        </h2>
        <Callout tag="Decision">
          <p>
            <strong>Deterministic field collection before the tool call.</strong>{" "}
            The model is not allowed to infer reproduction steps from a problem
            statement. It has to ask for description, steps, and environment
            explicitly; the tool schema rejects a call that is missing any of them.
          </p>
          <p>
            Cost: more turns in a session. Benefit: the tickets that do get filed
            are usable by engineering.
          </p>
        </Callout>
        <Callout tag="Decision">
          <p>
            <strong>Treat each runtime session as a hard boundary.</strong> Context
            does not carry across sessions, even when the same user returns. For a
            support agent, isolation is worth more than memory.
          </p>
          <p>
            Cost: the agent re-establishes context on every session. Benefit: no
            leakage between customers or test runs.
          </p>
        </Callout>
        <Callout tag="Trade-off">
          <p>
            <strong>Inject the FAQ instead of building retrieval.</strong> The
            policy corpus was small and fixed, so prompt injection was
            deterministic and easy to evaluate. It does not generalise to a real
            knowledge base — that is the first thing I would replace.
          </p>
        </Callout>
      </section>

      <section id="evaluation">
        <h2>
          <span className="n">05</span> Evaluation
        </h2>
        <p>
          The evaluation pipeline runs the same harness against a curated set of
          multi-turn scenarios, exports the traces in the JSONL shape Bedrock
          expects, and submits a model evaluation job. Correctness scores the
          answer against the reference; completeness checks whether the response
          covered what the scenario required.
        </p>
        <p>
          This is the part I would keep in any agent project. Without a repeatable
          eval loop, prompt edits are untestable, and the failure you introduce is
          usually the one you were not looking for.
        </p>
        <ul>
          <li>Scenarios cover all three routes: bug report, general support, FAQ.</li>
          <li>Boundary tests check that repro steps are never invented.</li>
          <li>Each run is isolated by session ID so results are comparable.</li>
        </ul>
        <Figure
          number="03.2"
          caption="Multi-turn dialogue traces from the evaluation test suite."
          note="Select a scenario trace to inspect guardrails, tool calls, and model evaluation scores."
        >
          <AgentEvalViewer />
        </Figure>
      </section>

      <section id="outcome">
        <h2>
          <span className="n">06</span> Outcome
        </h2>
        <ul>
          <li>
            A working end-to-end agent: classification, grounded answers,
            schema-validated tool calls, and persisted tickets with IDs.
          </li>
          <li>
            Infrastructure defined in CloudFormation, including the Lambda, IAM
            roles, and DynamoDB table.
          </li>
          <li>
            A reusable evaluation loop for prompt iteration, not just a demo
            transcript.
          </li>
          <li>
            Honest scope: a scholarship project with a curated test suite, not a
            production support system with real traffic.
          </li>
        </ul>
      </section>

      <section id="again">
        <h2>
          <span className="n">07</span> If I did it again
        </h2>
        <ul>
          <li>
            Replace prompt-injected policy with retrieval over a real knowledge
            base, then evaluate groundedness separately from correctness.
          </li>
          <li>
            Expand the adversarial set: contradictory details, mid-session
            corrections, and a user who insists the steps are &ldquo;obvious.&rdquo;
          </li>
          <li>
            Add latency and cost per session to the evaluation report. Quality
            without cost is not a deployable agent.
          </li>
        </ul>
      </section>
    </div>
  );
}
