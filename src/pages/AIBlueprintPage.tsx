import { BlueprintHero } from './ai-blueprint/BlueprintHero';
import { BlueprintProof } from './ai-blueprint/BlueprintProof';
import { BlueprintValue } from './ai-blueprint/BlueprintValue';
import { BlueprintSteps } from './ai-blueprint/BlueprintSteps';
import { BlueprintWhy } from './ai-blueprint/BlueprintWhy';
import { BlueprintCTA } from './ai-blueprint/BlueprintCTA';

export function AIBlueprintPage() {
  return (
    <>
      <BlueprintHero />
      <BlueprintProof />
      <BlueprintValue />
      <BlueprintSteps />
      <BlueprintWhy />
      <BlueprintCTA />
    </>
  );
}
