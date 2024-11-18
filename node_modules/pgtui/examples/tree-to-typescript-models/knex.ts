import { Knex } from "knex"
import { ModelTypeMap as SeamModelTypeMap } from "db/types/seam"
import { ModelTypeMap as NoiseawareModelTypeMap } from "db/types/noiseaware"
import {
  ModelTypeMap as SchlageModelTypeMap,
  ModelTypeMap as DiagnosticsModelTypeMap,
} from "db/types/schlage"

type PrefixedSeamModelTypeMap = {
  [K in keyof SeamModelTypeMap as `seam.${K}`]: SeamModelTypeMap[K]
}

type PrefixedNoiseawareModelTypeMap = {
  [K in keyof NoiseawareModelTypeMap as `noiseaware.${K}`]: NoiseawareModelTypeMap[K]
}

type PrefixedSchlageModelTypeMap = {
  [K in keyof SchlageModelTypeMap as `schlage.${K}`]: SchlageModelTypeMap[K]
}

type PrefixedDiagnosticsModelTypeMap = {
  [K in keyof DiagnosticsModelTypeMap as `diagnostics.${K}`]: DiagnosticsModelTypeMap[K]
}

// Using Types with KnexJS
// https://knexjs.org/#typescript-support
declare module "knex/types/tables" {
  interface Tables extends SeamModelTypeMap {}
  interface Tables extends PrefixedSeamModelTypeMap {}
  interface Tables extends PrefixedNoiseawareModelTypeMap {}
  interface Tables extends PrefixedSchlageModelTypeMap {}
  interface Tables extends PrefixedDiagnosticsModelTypeMap {}
}
