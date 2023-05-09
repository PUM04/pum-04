import React from 'react';
/**
 * @file declares cpp module FileHandler
 */
export class FileHandler extends React.Component<any> {
  /**
   * @brief Get the histogram for a given site
   * @param site_id The site id
   */
  GetHistogram(id: string): string;
  /**
   * @brief Get the box diagram for a given site
   * @param site_id The site id
   */
  GetBoxDiagram(id: string): Map<string, string>;
  /**
   * @brief Add a file to the FileHandler's buffer
   * @param file The content of the file
   * @param file_name  The name of the file
   */
  AddFile(result: any, file: any);
  /**
   * @brief Get the names and ids of all the sites
   * @returns std::vector<std::string> The names of the sites
   */
  GetSites(): string;
  /**
   * @brief Get the metrics for all sites.
   * @returns std::string The metrics
   */
  GetMetrics(): string;
  /**
   * @brief Go through the uploaded files and link the hosts to the corresponding performance files
   */
  ComputeFiles(): void;
}
